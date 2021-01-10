({
    firstjs : function(component, event, helper) {
        component.set("v.first", true);
        window.setTimeout(
            $A.getCallback(function() {
                component.set("v.first", false);
            }), 8000
        );
    },
    secondjs : function(component, event, helper) {
        component.set("v.second", true);
        window.setTimeout(
            $A.getCallback(function() {
                component.set("v.second", false);
            }), 8000
        );
    },
    thirdjs : function(component, event, helper) {
        component.set("v.third", true);
        window.setTimeout(
            $A.getCallback(function() {
                component.set("v.third", false);
            }), 8000
        );
    },
    fourthjs : function(component, event, helper) {
        component.set("v.fourth", true);
        window.setTimeout(
            $A.getCallback(function() {
                component.set("v.fourth", false);
            }), 8000
        );
    },
    fifthjs : function(component, event, helper) {
        component.set("v.fifth", true);
        window.setTimeout(
            $A.getCallback(function() {
                component.set("v.fifth", false);
            }), 8000
        );
    },
    sixthjs : function(component, event, helper) {
        component.set("v.sixth", true);
        window.setTimeout(
            $A.getCallback(function() {
                component.set("v.sixth", false);
            }), 8000
        );
    },
    seventhjs : function(component, event, helper) {
        component.set("v.seventh", true);
        window.setTimeout(
            $A.getCallback(function() {
                component.set("v.seventh", false);
            }), 8000
        );
    }
})