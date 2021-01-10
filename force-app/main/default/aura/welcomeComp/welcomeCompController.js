({
    doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        
        var action = component.get("c.fetchUser");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var userValue = response.getReturnValue();
                component.set("v.contactID", userValue.ContactId);
                component.set("v.userInfo", userValue);
                
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
    }
})