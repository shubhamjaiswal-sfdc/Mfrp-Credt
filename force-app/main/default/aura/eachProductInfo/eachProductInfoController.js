({
    navigate : function(component,event,helper){
        let recordId = component.get("v.product.Id");
         console.log(component.get("v.product"));
        let navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId" : recordId 
        });
        navEvt.fire();
    },
    
    orderProduct : function(component,event,helper){
        let prod = component.getEvent("bookProduct");
        prod.setParams({
            "product": component.get("v.product")
        })
        prod.fire();
    }
})