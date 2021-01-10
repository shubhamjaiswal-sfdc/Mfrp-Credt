({
	doInit : function(component, event, helper) {
        var spinner = component.find("spinner");
        $A.util.removeClass(spinner, "slds-hide");
        
		var conId = component.get("v.contactID");
        var action = component.get("c.getCardDetails");
        action.setParams({
            'contactId' : conId
        });
        action.setCallback(this, function(response){            
            if(response.getState()=='SUCCESS'){  
                component.set('v.cards',response.getReturnValue());
                spinner = component.find("spinner");
                $A.util.addClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
	},
    
    navigate : function(component,event,helper){
        component.set("v.cardVisible", true);
        var value = event.target.dataset.id;
        component.set("v.cardID", value);
        console.log("value" + value);
    },
    
    visibility: function(component,event,helper){
        component.set("v.visible",true);
    },
    
    hiding: function(component,event,helper){
        component.set("v.visible",false);
    }
})