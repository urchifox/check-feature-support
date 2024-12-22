# Feature check

A web page that helps identify browser capabilities for the browser in which it’s opened.

## Background

In one of my projects, I needed to ensure that the website had worked correctly in default mobile browsers. I discovered that each smartphone brand has its own built-in browser (for example, Samsung Internet for Samsung devices). The site looked different on various devices: parts of the layout would break on some phones, and the site almost completely fell apart in the Vivo browser. I couldn’t find information about CSS support in these browsers or identify their engines. So, I had to adjust styles by guessing and checking the results, that took a lot of time.

Then, I realized it would be better to ask the opened browser directly whether it supports specific properties or not. I created the widget (available only in the dev build) where you can enter a CSS property and immediately check its support. Using this widget, I was able to identify all problem properties in a particular browser and replace them with more stable alternatives, fully restoring the site’s appearance. Later, this widget grew into the current project.

## How feature checks work

### CSS

This section includes two types of checks for visibility and reliability:
- JavaScript uses `CSS.supports` to test the specified value, providing a text output indicating whether the feature is supported.
- The text output is styled with `@supports` and `@supports not`, color-coded for clarity (green for support, red for lack of support).

For checking custom property support, a custom property is used instead of `@supports`, changing the text color from red to green if supported.

For verifying specific units, the test checks a property that uses that unit. For example, `width: 1${userInput}` is used to test length units.

## Suggestions and feedback

You can contribute to this project by submitting a pull request or emailing feedback and suggestions to [urchifox@gmail.com](mailto:urchifox@gmail.com).
