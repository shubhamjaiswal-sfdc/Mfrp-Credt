({
    handlePoints : function(component, event, helper) {
        var action = component.get("c.activeUser");
        action.setParams({
            "contactId" : component.get('v.contactID')
        })
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnedValue = response.getReturnValue();
                console.log("returnedValue : " + returnedValue.CREDT_Points__c);
                component.set("v.conPoints", returnedValue.CREDT_Points__c);
                component.set("v.visible",true);
            }
        });
        $A.enqueueAction(action);
    },
    
    doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        
        var action = component.get("c.fetchUser");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var userValue = response.getReturnValue();
                component.set("v.contactID", userValue.ContactId);                
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
    }
})