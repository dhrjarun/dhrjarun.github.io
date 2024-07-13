---
title: Making of a chat app[BlindBird]
publishDate: 2023-11-30
draft: false
archive: false
---

## Introduction

Once upon a time, I built a web application, I call it [BlindBird](https://github.com/dhrjarun/BlindBird/). Do you know why? It was a chatting app where you could search someone by twitter username and if the person is registered, you can message them anonymously. Here’s a little [demo](https://youtu.be/Ojf3QUMvWh4?si=B5byMF_qf1ylau5v) of it.

This was the first time, I completed a whole project all by myself. I got the confidence and started seeing myself as a true developer. I share the project on twitter people liked the [tweet](https://x.com/dhrjarun/status/1574036502627188736?s=20) and some DMed me asking how I built it. But nobody from twitter signed up for it. I was bit sad, then one of my school friend signed up; he actually made an account on twitter for that. I would like to thank him. And we chatted on it. It was amazing; chatting on system I designed, I built and I deployed. I loved the experience.

First commit was made on Jul 9, 2022 and last on Dec 7, 2022. So It took me about 5 months to build this project. I was at most giving it 2 hours every night and 4-5 on weekends since I was interning at that time. I think having a idea of time frame is important, human have irrational optimistic imagination about time.

When beginning the project, I had no experience with every tools, I was going to need. still I went for the process. I like this way of learning, for me it provides purpose to learning making it more enjoyable. I made mistakes, learned few thing. This blog is all about that.

## UI & Styles

In the [client directory](https://github.com/dhrjarun/BlindBird/tree/master/client), you can see its react. I had heard about NextJS but never tried it. I chose [Vite](https://vitejs.dev/) as the bundler, turns out it was a mistake. After deploying the site with vite production build, visiting URLs directly was getting [redirected to 404 page](https://stackoverflow.com/questions/52749823/react-router-dom-build-giving-404-when-accessing-url-directly-but-not-in-develo). Had to use [HashRouter](https://reactrouter.com/en/main/router-components/hash-router) to fix the issue.

At that time, I was into css-in-js. I had used [Chakra UI](https://chakra-ui.com/) and was really impressed by concept like theme. [Responsive style](https://chakra-ui.com/docs/styled-system/responsive-styles) — no need of writing media statement, write styles in a single line for every sizes of screen. The [sx props](https://chakra-ui.com/docs/styled-system/the-sx-prop) and [other style props](https://mantine.dev/styles/style-props/) where theme-aware values can be passed, forget about css variables. Before that, I had been writing CSS only and these features blew my mind. I end up trying almost all css-in-js based solutions: [emotion](https://emotion.sh/docs/introduction), [styled-components](https://styled-components.com/), [theme-ui](https://theme-ui.com/), [mantine](https://mantine.dev/), [stitches](https://stitches.dev/). Well, each has some interesting features I loved but lacked some I also loved. I spent quite sometime in learning about [theme and tokens](https://github.com/styled-system/styled-system) and customizing other’s themes and reading their [source](https://github.com/chakra-ui/chakra-ui/tree/main/packages/core/styled-system/src) [code](https://github.com/mantinedev/mantine/tree/master/src/mantine-core/src/core).

I really liked [MantineUI](https://mantine.dev) design, so incorporated it in the project to save some time. Although eventually I would have created the custom components for a little unique vibe.

## API and Database

In the [server directory](https://github.com/dhrjarun/BlindBird/blob/master/server/src/app.ts), you can see its [apollo-graphql](https://www.apollographql.com/docs/apollo-server) server.

I had just [learned](https://www.youtube.com/watch?v=VnG7ej56lWw) [graphQL](https://graphql.org/), was more [impressed](https://www.youtube.com/watch?v=AYZOHt6kz6Y) of it than rest api. For the database, I had some experience with monodb but to widen by knowledge I was exploring SQL. Hence to get some experience I went for postgres. In the [entity folder](https://github.com/dhrjarun/BlindBird/tree/master/server/src/entity), you can view three tables(chat, messages and user) created using [type-orm](https://typeorm.io/). In typeorm, tables are created using class called Entity and it heavily uses [typescript decorator](https://www.typescriptlang.org/docs/handbook/decorators.html). In the same Entity classes, I use [type-grpahql](https://typegraphql.com/) decorators to create [graphql types](https://www.youtube.com/watch?v=Y78PadVft7I). Typeorm and type-graphql are meant to be work together.

[Chat entity](https://github.com/dhrjarun/BlindBird/blob/master/server/src/entity/Chat.ts) has 6 columns: id, createdAt, name, revealGender, firstPerson, secondPerson. You might wonder about why chat has name column. The user who is initiating the chat is called firstPerson who is anonymous to the secondPerson(I told you its anonymous chatting app) whom the firstPerson want to message. That is why firstPerson can choose a name for the chat which will be shown to the secondPerson by default it is `unknown#${number}`.

In the [User Entity](https://github.com/dhrjarun/BlindBird/blob/master/server/src/entity/User.ts) we’ve three columns: id, createdAt and tId. tId is the twitter id of the user and other fields like tUsername, tPfp, publiMetrics are populated from twitter api. You can also see two relational fields with Chat table, myChats and yourChats. myChat is the list of chatIds in which user is firstPerson and yourChats where user is secondPerson.

[Message Entity](https://github.com/dhrjarun/BlindBird/blob/master/server/src/entity/Message.ts) has 6 columns: id, createdAt, isSeen, chatId, sender. sender is the enum for acknowledging whether the message is created by firstPerson or secondPerson.

## Authentication

OK, You thought my app is super cool so you clicked on “Register” button. It will direct you to [api.blindbird.online/auth/twitter](http://api.blindbird.online/auth/twitter). At this [endpoint](https://github.com/dhrjarun/BlindBird/blob/master/server/src/modules/user/auth.ts), server will [check to see](https://github.com/dhrjarun/BlindBird/blob/master/server/src/boot/auth.ts) if user with particular twitter userId already exist in the table if not than it creates a new row. A new session will be created on the server, stored in redis and you will be redirected to the application with a cookie. From then on all the request to the server will be accompanied by auth cookie which is used to retrieved session. [Session is parsed as user object and passed](https://github.com/dhrjarun/BlindBird/blob/fb4cf7fd9914c28481f02f8713e0496ccc4deb44/server/src/app.ts#L144-L166) to `context` in graphql resolvers. When [log out request](https://github.com/dhrjarun/BlindBird/blob/master/server/src/modules/user/logout.ts) is sent it will delete your session as well cookie associated with it.

I had some hard times in [understanding OAuth](https://roadmap.sh/guides/oauth). Well [PassportJs](https://www.passportjs.org/packages/passport-twitter/) simplified the process. Passport JS requires two GET api endpoints.

```tsx
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);
```

It took me days to implement it because I was trying to implement them using graphQL mutation. Which was ridiculous thing to do. GraphQL request are ajax but these API call need to redirect the user to twitter, after twitter authentication, it redirects the user to callback API endpoint with token. Because of all this redirection it needed to be a get API endpoint. Such simple concept took me so much time to understand. I also had some issues with CORS and cookies which taught me about browser safety mechanisms.

On startup, a graphql query “me” is sent, [resolver](https://github.com/dhrjarun/BlindBird/blob/fb4cf7fd9914c28481f02f8713e0496ccc4deb44/server/src/modules/user/user-resolver.ts#L10-L20) reads `user.id` from `context` and return row corresponding to the user. React [UserContext](https://github.com/dhrjarun/BlindBird/blob/master/client/src/user/user-ctx.tsx) is populated by this data which then let you pass through the [Protected-Routes](https://github.com/dhrjarun/BlindBird/blob/master/client/src/protected-route/protected-route.tsx) like “/chat”. If no auth cookie is sent or is invalid “me” query return `null`.

## Frontend States

Now, I would like to talk about states required here. Obvious one is [chats state](https://github.com/dhrjarun/BlindBird/blob/master/client/src/chat/api/hooks/use-chat-api.ts), which is a list of chat objects containing properties like id and users. The order of the list is important, chat with most recent message are listed top in the UI.

For each chat there is a [messages state](https://github.com/dhrjarun/BlindBird/blob/master/client/src/chat/api/hooks/use-messages-query.ts) which holds all the messages of that chat. It is a list which grows both ways. Initially couple of messages from the backend are populated into the state. New messages are pushed in the state. User can also scroll up, resulting in fetching of some older messages which will be added in the beginning of the list.

App displays number of unread messages next to each chat in the list UI. I could select them from messages state. However I guessed, filtering unread messages from the lists on each render will be expensive. Therefore I thought of managing dedicating state for it. Initially unread messages can be fetched from API or from the messages state. later on receiving new message, it will be added to the state list, after user reads it, it will be removed.

Since some states needed to be global, I utilized [react-query](https://tanstack.com/query/latest)( only because I was [impressed](https://www.youtube.com/watch?v=DocXo3gqGdI) ). In the [code](https://github.com/dhrjarun/BlindBird/tree/master/client/src/chat/api/hooks) you could find snippets `queryClient.setQueryData` for updating states. It would have been simpler and better organized if I had utilized some other library( not any async state manager ). I don’t hate react-query or any async state manager, but I guess they not suitable for the complex unique states and it was my mistake forcing react-query in here only because I had just learned it.

## The Act

In the [home](https://github.com/dhrjarun/BlindBird/blob/master/client/src/landing-page/index.tsx), you’ll find an `xl` input enter your friend’s username. You press enter and app will send “user” query(with tUsername argument) to retrieve [some info which will be shown to you](https://github.com/dhrjarun/BlindBird/blob/master/client/src/user-profile/index.tsx). Well your friend is registered with us. Click on the chat button, [it will](https://github.com/dhrjarun/BlindBird/blob/fb4cf7fd9914c28481f02f8713e0496ccc4deb44/client/src/user-profile/index.tsx#L34-L66) check to see particular chat between you and your friend already exist, that chat will be me made active in the [chatContext](https://github.com/dhrjarun/BlindBird/blob/master/client/src/chat/api/chat-context.tsx) state. if it doesn’t exist, in the queryClient a new chat object will be added temporary and it will be made active. Next you will be navigated to chat UI. Row for this chat in database will only be created if you make a message to your friend. if you won’t, it will be removed from queryClient. So lets [send a message](https://github.com/dhrjarun/BlindBird/blob/master/client/src/chat/components/chat-feed/chat-input.tsx) to your friend. Since its the first message, [app will](https://github.com/dhrjarun/BlindBird/blob/fb4cf7fd9914c28481f02f8713e0496ccc4deb44/client/src/chat/components/chat-feed/chat-feed.tsx#L56-L96) first send a createChat mutation which will make a chat where you are the firstPerson and your friend is secondPerson. Then createMsg Mutation will take your message and make a row for it in message table. Not just that, it seems your friend is online at the moment so he will be notified in real time? How? it is done by GraphQL subscription with web-socket. The moment a user enters the app, [it makes](https://github.com/dhrjarun/BlindBird/blob/fb4cf7fd9914c28481f02f8713e0496ccc4deb44/client/src/App.tsx#L16-L22) a real time web-socket connection with the server and starts listening to the `newMessage` subscription. At your friend’s end, `newMessage` subscription will be fired, in the payload it will have message object, `queryClient` message query will be updated as well a Mantine toaster will be displayed. Now you two have some conversation?

## Behavior of Scroll

While having conversation have you noticed scrollbar in the chat behaves abnormally? To understand that you would need to understand [how scrolling works](https://javascript.info/size-and-scroll) in browser(few concept like clientHeight, scrollHeight, scrollTop would be enough).

On sending new message, it scroll immediately to the bottom of the screen. On fetching old messages by scrolling up, the viewport of the feed need to stay the same(exact messages should stay visible even after the increase of scrollHeight) which is done by increasing scrollTop. On receiving message, if the scroll is at the bottom, it will stay at the bottom otherwise no action needed. In the [chat feed](https://github.com/dhrjarun/BlindBird/blob/master/client/src/chat/components/chat-feed/chat-feed.tsx), scroll behaves opposite of the normal. It took me some time to [implement](https://github.com/dhrjarun/BlindBird/blob/master/client/src/chat/components/chat-feed/chat-scroll-area.tsx) and since it uses `getSnapshotBeforeUpdate` I had to use react class component which I rarely use.

## Marking Message Seen

How should [message be marked seen](https://github.com/dhrjarun/BlindBird/blob/fb4cf7fd9914c28481f02f8713e0496ccc4deb44/client/src/chat/components/message-bubble/message-bubble.tsx#L24-L42)? I used [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) to accomplish the job. The moment a message element is visible on the screen, a `markSeen` request is send to the server, which makes `isSeen: true` for that message row. Well one hypothetical problem is what if there are so many unseen messages due to that only the most recent messages got the chance to be viewed. Led to new messages be seen yet couple of older message still unseen. To mitigate this I later had the idea of having a column `lastSeenMessage: MessageID` in the chat table instead of `isSeen: boolean` in message table. With that even if only the most recent message came to the viewport, all the messages before it will also be considered seen. I hadn’t test idea thought, there might be few obstacle with that.

## Deployment

Frontend was [deployed on](https://github.com/dhrjarun/BlindBird/blob/master/.github/workflows/client-deployment.yml) Github Page, while for API server a docker image is [created and stored](https://github.com/dhrjarun/BlindBird/blob/master/.github/workflows/server.yml) in github-packages. Both actions are executed by GitHub Action on pushing new commit. Next I got a DigitalOcean droplet up and running. With docker-compose, I configured nginx, postgres, lets_encrypt and the API server images. Had some trouble with lets_encrypt; the process of SSL/TLS certification is complex one. After all this our API was accessible on api.blindbird.online as well as [www.api.blindbird.online](http://www.api.blindbird.online/).

Before DigitalOcean, I tried AWS. I didn’t like the unnecessary complication of AWS. Although I learned a lot about networking by reading their [docs](https://docs.aws.amazon.com/). There were some manual work involved in deployment, If I had spent some time I would have made it totally autonomous.

## Testing

I had setup e2e testing using Cypress. During this project, I learned the value of automated testing. I was implementing a feature which involved a series of repetitive actions — clicking multiple buttons, inputting text, and verifying some UI feedback. Imagine making a simple change in the codebase and doing a long series of steps to see if it works correctly? it became quite tiresome. Although I wrote only [one e2e test](https://github.com/dhrjarun/BlindBird/blob/master/client/cypress/e2e/NewChat.cy.tsx) but after that in every project I try to test my code with code. If I had not given up on the project, my plan was to first write all the e2e tests, followed by some API tests, and then a few necessarily unit tests.

Later I explored Playwright, I found it to be less user-friendly compared to Cypress, but it would have been more suitable for a chat app scenario. In here, interactions between multiple users need to be tested and Playwright does support multiple browser windows simultaneously.

## The End

If you have read all of it, thanks man! but the sad thing is you can’t experience the app for yourself. I had 100$ credit on DigitalOcean for a couple of months, than I had to stop the server since no one was using it.

It was a personal achievement of mine, so I wrote about that experience. I had quite few ideas for further development and It needed some refactoring and few bug fixes. But I guess, I found stuff more important than it.

After completing this project, I found myself interested in opensource, if you want to read that journey, you can read here.

Well, That’s it then!,
