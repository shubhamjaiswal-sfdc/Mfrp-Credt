({
    doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");

		var conId = component.get("v.contactID");
        var action = component.get("c.userRewards");
        action.setParams({
            'contactId' : conId
        });
        action.setCallback(this, function(response){            
            if(response.getState()=='SUCCESS'){  
                component.set('v.rewards',response.getReturnValue());
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
	},
    onMouseOver: function(component, event, helper) {
        var eventGetSource = event.getSource();
        var eventSourceVal = eventGetSource.get("v.title");
        eventGetSource.set("v.value", eventSourceVal);
        
    },
 
    onMouseOut: function(component, event, helper) {
        var eventGetSource = event.getSource();
        eventGetSource.set("v.value", '********************');
    },
    
    navigate : function(component,event,helper){
        let recordId = event.target.dataset.id;
        console.log("rec ID: " + recordId)
        let navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId" : recordId 
        });
        navEvt.fire();
    }
})