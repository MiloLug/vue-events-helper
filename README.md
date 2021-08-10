# vue-events-helper
> Requires vue3

Vue plugin that helps with custom events creation.

## Install
```console
npm i @quartz-vision/vue-events-helper
```

## Setup

```js
import Vue from "vue"
import VueEventsHelper from "vue-events-helper"

const myEvents = new VueEventsHelper("my");

myEvents.registerEvent("interaction", {
    mounted(el, {handler}) {
        el.addEventListener("click", handler);
    },

    beforeUnmount(el, {handler}) {
        el.removeEventListener("click", handler);
    }
});

const app = createApp(myApp)
  .use(myEvents);
```

## Usage
```vue
<div v-my:interaction="onInteraction">
```


## Methods

### registerEvent
```js
helper.registerEvent(name, manager)
// name - event name
// manager - object with lifecycle hooks

helper.registerEvent('myEvent', {
  // called before bound element's attributes or event listeners are applied
  created(el, eventSpecification) {},
  
  // called before bound element's parent component is mounted
  beforeMount(el, eventSpecification) {},
  
  // called when bound element's parent component is mounted
  mounted(el, eventSpecification) {},
  
  // called before the containing component's VNode is updated
  beforeUpdate(el, eventSpecification) {},
  
  // called after the containing component's VNode and the VNodes of its children // have updated
  updated(el, eventSpecification) {},
  
  // called before the bound element's parent component is unmounted
  beforeUnmount(el, eventSpecification) {},
  
  // called when the bound element's parent component is unmounted
  unmounted(el, eventSpecification) {}
})
```

Event hooks are passed these arguments:
#
`el`

The element the event is bound to.
#
`eventSpecification`

An object containing the following properties.
```js
{
  modifiers: {a: true, b: true},  // for example v-my:interaction.a.b="...",
  handler: function,  // The handler passed to the event directive
  oldHandler: function  // The previos handler, only for beforeUpdate hook
}
```
