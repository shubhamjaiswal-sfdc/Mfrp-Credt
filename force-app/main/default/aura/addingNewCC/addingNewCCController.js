({
    doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        
        var action = component.get("c.fetchUser");       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var userValue = response.getReturnValue();
                component.set("v.ownId", userValue.ContactId);
                
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
    },
    
    handleSubmit: function(component, event, helper) {
        event.preventDefault();
        var x = component.get("v.ownId");
        var eventFields = event.getParam("fields");
        eventFields["Owner_Name__c"] = x;
        component.set("v.visible", false);
        component.find('myRecordForm').submit(eventFields);
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Submitted Successfully!",
            "message": "Your Credit Card Details are under Review",
            "type": "success",
            "mode": "pester",
            "duration" : 2000
        });
        toastEvent.fire();
    }
})