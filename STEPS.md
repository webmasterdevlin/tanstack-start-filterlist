# DEMO STEPS

## (Introduction)

- Aurora, web dev, norway, consultant at Inmeta in oslo
- Excited to speak here today, because i'll be teaching you how to elevate speed, interactivity and user experience with React Server Components.
- I will be coding something inspired by a feature i’ve built for my current consultancy project, where im actively using React Server Components.

## Setup and starting point

- This is a project task manager demo app. The very talented designer (smile) of my current project Eileen Røsholt has designed the UI, and it's inspired by a feature we made in that project.
- The setup is of course Next.js App Router, prisma and an Azure DB, tailwind CSS.
- Demo app, new tab: Very slow load, slowed down data fetches on purpose.
- But, it's actually not bad. Try out tabs, try search with a basic form, see the result in the table.
- The App Router is server first, and this is all server components, which means there is no js shipped to the client for these components. Just html, links and a form, which means things work without js.
- We start with web standards first, good base case, will work even if we are on a device with low processing power that cannot run JS efficiently.

## Review lighthouse scores

- Open pre-run lighthouse screen. Show impact of each by hovering circle.
- FCP: Bad since we are showing nothing until all server components are done.
- LCP: Bad, out LCP is shown same time as our FCP.
- Speed index bad since it measures incrementally how much content is shown, but we have nothing until everything is shown.
- TBT: 0 since no JS, responsive page, no uncanny valley since default elements.
- CLS: 0 since everything is painted at once.
- Overall metrics are bad but actually not the worst because we have no js to get high TBT and no moving elements to get high CLS.
- However the app feels terrible on initial load because we are waiting for everything to render on the server and only getting the default browser spinner.

## Go through the code

- Async layout.tsx server component
- Show the different data files just querying a db, been made dynamic with connection() and slowed with slow(). (In the future of Next.js with dynamicIO as announced on the keynote, this would become dynamic by default and we would rather opt in to static.)
- Mention each component in the file, search and form, children:
- Async [tab] page.tsx server components, we are querying our db based on filters directly based on the filters inside this server component.
- Dynamic requests, static is easy because this could be run in the build, but this is dynamic data. We have to await at runtime.
- Basically, want we want to do is elevate the speed, interactivity and UX of this app, and improve the web vitals that are bad without worsening the good ones.

## Improve the UX when switching tabs

- Lets improve the UX of these tabs.
- Tabs are navigating but very slowly, because we are waiting for the await for the table data in page.tsx to finish.
- Suspense will allow us to mark a server component as non-urgent, and show a fallback while waiting for finish, and then stream it in.
- Let's unblock the page.tsx by adding loading.tsx inside /[tab] to create an implicit suspense boundary. Now it can navigate instantly. Go to "todo" tab.

## Improve data fetching in layout.tsx

- For the initial load, I'm blocked by the awaits in the layout and I cant show anything on the screen.
- Layout.tsx fetches are running sequentially even though they don't depend on each other.
- The first through might be to run them in parallel with promise.all().That would help, but you would still be blocked in the layout.
- So, let's push the data fetches down from the layout to the components themselves.
- Move projectDetails fetch to projectDetails.tsx, and move tabs fetch to tabs.tsx. Each component is now responsible for their own data, making them composable, (by colocating data and ui).
- Display suspense fallbacks with "loading..." around projectDetails, and around tabs. - Show the result: streaming in the RSCs using just a little js as they complete on the server. Running in parallel, have a lower total load time. We can actually show something on the screen and even interact with what we have (fill search).
- However, did you see how the elements are visually unstable as they load. We got cumulative layout shift. Uncomfortable UX. Open CWV: CLS is no longer 0, and is very impactful on our scores.
- We have to make loading fallbacks the right size. Replace with skeletons.
- Open CWV: Showcase the improved CLS. Managed 0-0.1 since my skeletons are good, but this can be hard to obtain with dynamically sized content.
- We also fixed the FCP and LCP since we are showing the project information right away and not blocking the page, and LCP is our FCP which is the project information and its very fast. (Our LCP is still slowed down but greatly improved).

## Improve UX

Let's continue to improve the UX, it is still not good here.

### Mark active tab and read promise with use in Tabs.tsx

- Let's start by showing the currently active tab. Add useParams and get active tab. Make client component. We cannot have this async now, and we cant access db anyway here, we have to fetch the data outside. Put the data outside.
- But we don't want to get back to blocking our layout. Lets remove the await and pass it down to the Tabs as a promise.
- Then we can read the promise with use() which will resolve it, and the component will suspend the same way allowing us to see the fallback.
- Now we can see the active tabs and navigate between them.

### Add a loading spinner to Search.tsx

- Uncomfortable experience in the search when using the default form submit, which is a GET pushing the values of the inputs inside the form to the URL. Full page and cant see active search.
- Progressive enhancement of the base case search. Let's first use the new Nextjs 15 form component to make this a client side navigation when js is loaded: import, use form and add action, current route with empty string.
- As a user, we want to know that something is happening in the app.
- Since this is a form, we can head over to the Search.tsx and useFormStatus to get the submitting status. Enable the spinner.
- We can also consider adding an onChange handler, we want to push to the router. Add router, params, and searchParams.
- Onchange newSearchParams. We gonna use the existing search params because we will keeping the state in the URL as a single source of truth, because the state of the app will be reloadable, shareable, and bookmarkable.
- Add defaultvalue.
- Add activetab to reset with a key.
- Add "use client".
- Notice the url is updating later because we are waiting for the await in the table to resolve before routing.
- Explain useTransition: mark a state update as non-urgent and non-blocking and get pending state.
- Use pending state to display user while waiting for the navigation to finish, which is the await in the table component. Reload.
- Enable the spinner, while we are transitioning, we can see it.
- When this is hydrated by js, we have the progressive enhancement of the onchange and the spinner.
- (Using a transition also batches the key strokes, leaving only one entry in the history.)

## Add CategoryFilter.tsx to layout.tsx

- Add the CategoryFilter component to layout.tsx. It takes in a categories promise and reads it with use. Pass it down with a new data fetch and suspend with correct skeleton, demo load.
- This component is filtering with searchParams again, using the URL as the state again. However when we click the tabs, we don't see anything happening.
- Pay attention to the URL. It's not updating until the new table in page.tsx is done with its await query and finished rendering on the server. Therefore we cannot see the active filters right away.
- Let's mark the loading state. Add startTransition around router.push. How can we use this isPending? Not a lot of options, not suitable for a spinner.
- Show class group in layout, show pseudo-class group-has data-pending in page.tsx.
- Show the result. Instead of showing nothing i.e using a suspense, we can show stale content and indicate that it's stale.
- Instead of creating a global state manager, we can just use css. Add data-pending=isPending attribute.
- But i also want responsive buttons, and were gonna use useOptimistic - it is a great tool to handle this. It will take in a state to show when nothing is pending, which is our "truth" of the url, and return an optimistic value and a trigger function.
- Add useOptimistic to CategoryFilter.tsx. Set them inside the transition while waiting for the router to resolve. Showcase.
- UseOptimistic will create a optimistic state on the client, but then throw away it away after the transition completes. The categories are instant and don't depend in the network.
- Credit to Sam Selikoff with his post on buildui blog for this pattern.
- (Batchign again, only updating once we are done selecting, leaving only one entry in the history.)

## Cache() getCategoriesMap in categories.ts

- Let's consider the data fetching in the layout.
- We are fetching the categories twice for every render - once for the task summary and once for the category filter. Show terminal logs 2x. We can reuse the the return value of getCategoriesMap.
- Add cache() React 19 function to getCategoriesMap in categories.ts. This enables per-render caching. Pay attention to the load time, refresh.
- The load time is actually reduced by 500ms because the StatusTabs and the CategoryFilter are using the same return value of getCategoriesMap. And you can see it's only run once. Show terminal logs 1x.
- Instead of passing the data down from a common parent (hoisting), the components all call the same cached data. This means that can keep using our pattern of fetching data inside the components themselves, maintaining composition.
- Also useful when generating dynamic metadata

## Turn on staleTimes in next.config.js

- Enable more caching.
- Every time we click a tab, filter, or search, we are rerunning the page.tsx table on the server, with the data fetch. We can resuse this, my data doesnt need to be that fresh.
- Enable staleTimes in next.config.js. This will cache the rsc payload on the client for the route page.tsx, the table. Refresh page.
- Show the result. Click the same twice. Now we dont have to regenerate the server component every time.

## Final demo

- See content right away, and interact with tabs while streaming in the server components as they finish rendering on the server. And we have some nice caching here.
- Reload, even filter before the streaming is complete, enable "testing" and "backend".
- Search for "api", spinner. Enable/disable filter, see that my content is stale. Reload/share/bookmark the page and have the same state.
- Greatly improved UX. Even though the data fetches are still extremely slow, the app feels super responsive.
- And this is very robust: progressively enhanced the no-js base case, and just added a low amount of js, using it only where needed. (No race conditions because of useTransitions batching.)
- No useEffects or useStates in sight. We are making interactive apps without that in this new world of React Server Components.

## Improve Speed Index with Partial Pre-rendering

- We can still improve the speed. Show project details in layout. Actually, we are dynamically fetching this project info data on every page load even though it very rarely changes.
- This could be static data that we can revalidate on a time based interval using for example fetch options, or, the new Next.js directive "use cache" and its related APIs. Wasting resources and time. Static is the fastest.
- I want to use Partial Prerendering. This will allow me to partially the layout as static - everything not inside suspense boundaries. (In the future, that would be determined with "use cache")
- Remove the suspense around the projectDetails. Remove the connection() from the data fetch. Show the result: app is frozen again. Suspense Search because SearchParams with skeleton because SearchParams opt into dynamic rendering.
- Turn on partial prerendering in next.config.js. I need to make a production build, I've already deployed it so we can see it. Also turn on CSS inlining for even more speed.
- Open the second tab in new window.
- Copy paste new tab: the app is now instantly showing useful content. This can be extremely impactful on a bigger application with larger or slower chunks of static content.
- Reload, its just there right away because its static.

## Review lighthouse scores again

- Open the third tab in new window with pre-run scores. Hover scores.
- Again, the LCP and FCP are much improved since the first run because they are both the project information, but we can also see that the speed index improved since we show start off with more content, the project information, before showing incrementally more content, as seen in filmstrip.
- We can also maintained the TBT of 0, which corresponds to the responsive clicks because we have minimal JS and no long tasks.
- Maintained 0 CLS because of these skeletons being sized correctly.
- We have greatly improved performance, getting 99 score in lighthouse even with a 2.3s second total load time application.
- We managed to complete our task of improving the bad metrics and maintaining the good ones, while also making app fast, interactive and user-friendly.

## (Conclusion)

That's it for this talk, the code is pinned on my github, and follow me on twitter if you are interested in more RSC content. Thanks for listening!
