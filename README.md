# `twere

**`twere** is a journalling webapp for developers. It's intended to be a natural everyday work tool which allows you to keep track of the things you're doing, a place to save code snippets and useful links, and to help you keep track of the things you want to get done.

The more you use **`twere**, it will become a rich resource you can easily search, to retrieve the useful things which your brain has evicted from it's RAM, and to give you insights and hints about the work you do.

**`twere** is a vanilla JavaScript applicaiton which runs exclusively in the browser. Data stays with you, on your device, works offline and doesn't require any kind of login (unless you want the option to lock your data).

At the moment **`twere** is a very early proof of concept and is in a pre-alpha state. The plan is to have an alpha release ready for testing as quickly as possible, closely followed by a more formal beta release. Watch this >< space!

## Some backgorund

**`twere** is being developed as an open-source progressive web application (PWA). All of your data is stored locally, and is intended to be a ridiculously simple tool which you are using all day, every day.

The idea was inspired in part by the idea of a `did.txt` file, which was created and implemented by [Patrick](https://theptrk.com/2018/07/11/did-txt-file/). It also emerged from a frustration with traditional task trackers and GTD applications. Almost every modern application will focus on the things you are _going_ to get _done_. The onus is always on forward momentum, completing tasks and then discarding then. [iA Writer](https://ia.net/writer) is also an ispiration: the clean, distraction-free interface, with a focus on beautriful typographic design is something which works well in a development toolset.

But almost all of the things we _do_, and the things we _learn_ — including the _mistakes_ we make — have value. We should be able to refer back to a clever command snippet, or a useful link about something or other, or a headache-inducing gotcha — because they are useful things we have experienced or _learned_ from. And it's useful to be able to put a pin in something during a busy period, or to be reminded of something useful to return to and absorb when we have more head space available.

Notebooks, note apps, reading lists, task managers, bookmarks, calendars, are all really useful tools. **`twere** aims to augment the best of these traditional tools, and then sprinkle in the ability to easily grab things you've stowed, or forgotten about, and even to help you work healthier through break reminders, or [Pomodoro](https://en.wikipedia.org/wiki/Pomodoro_Technique).

It's early days for the project, and there are plenty of challenges ahead. But the hope is that **`twere** can become a tool which allows us, as developers, to be nourished by the things we find, learn and do — and to have an opportunity to reflect on the great things we _did_ as much as the great things we are going to _do_.

## Principles

**`twere** is being developed with some important guiding principles.

### Privacy by design

**`twere** is an application which runs exclusively in your browser, and data is stored on _your_ computer. The server is only contacted when the application assets need to be updated. There are no cookies, there is no need to authenicate. Your data is kept where it belongs: with you. You can even run it offline.

### Keep it simple stupid

[KISS](https://en.wikipedia.org/wiki/KISS_principle) is a valuable design principle. The application is being written using vanilla JavaScript modules and web components, with zero deployment dependencies. It's intended to be easy to understand and maintain, by aspiring to [Unix philosophy](https://en.wikipedia.org/wiki/Unix_philosophy) and the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). No frameworks, no cruft; low bandwidth, fast runtime.

### Modern && Accessible

This application aims to take advantage of exciting, modern web APIs, and will require a modern, mainstream browser. Considering the target user is the mighty software developer, in most cases, that should be a great fit.

But what about an aspirational startup in a developing country; a disabled person doing great things in their profession, using assistive tools; somebody who has no desire to conform to being "upwardly mobile", but is nonetheless impassioned to use technology to inspire change?

**`twere** is designed to be a modern web app. But there is also an aspiration to make it accessible and progressive. A difficult, but important task which will be discussed more soon.

### Avoid noise

**\`twere** is being designed to stay out of your way; but be close to hand when you need it. Notification noise is a huge problem nowadays: apps resort to pestering and nagging us in a faux-friendly manner, and we all only have so much attention. The UI for **\`twere** will be obsessively simple; it is command-led and will only prompt you when absolutely necessary, or on your terms. It is being designed to infer the context of your interactions, and where your attention is focused.

## Development

### Tooling

The following is a list of some of the development tools being used:

- https://yarnpkg.com/
- https://standardjs.com/
- https://github.com/zeit/serve
- https://karma-runner.github.io/3.0/index.html
- https://pptr.dev/

### Running a development environment

To fire up a development server:

```
$ yarn serve
```

To run tests:

```
$ yarn test
```

Testing is currently focused on Firefox, Chrome and Safari desktop browsers. Internet Explorer, Edge and mobile will be added soon.
