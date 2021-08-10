class VueEventsHelper {
    static defaultActions = [
        "created",
        "beforeMount",
        "mounted",
        "beforeUpdate",
        "updated",
        "beforeUnmount",
        "unmounted"
    ];
    
    // lifecycle handlers are placed here
    eventManagers = {}
    constructor(directiveName = "events"){
        this.directiveName = directiveName;
    }

    registerEvent(name, manager) {
        this.eventManagers[name] = manager;
    }

    // calls a hook on specified event (using hook name)
    callStateHandler(name, el, {arg, modifiers, value, oldValue}) {
        if(!this.eventManagers[arg])
            console.error(`Event ${arg} doesn't exist!`);
        else
            this.eventManagers[arg][name]?.(el, {
                modifiers,
                handler: value,
                oldHandler: oldValue
            });
    }

    install(app) {

        app.directive(this.directiveName, this.defaultStatus.reduce(
            (acc, action) => (
                acc[action] = (el, bindings) => this.callStateHandler(action, el, binding),
                acc
            ),
            {}
        ));
    }
}


export default VueEventsHelper; 

