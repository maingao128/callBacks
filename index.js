(function($,window){
		
		var Callbacks = function(option){
			var jsonCash = {},
				list = [],
				memory,
				fireIndex,
				fireLength,
				once,
				optionArr = [];
			if(option && typeof option === "string"){
				var optionArr = option.split(" ");
			};
			if(optionArr.length){
				for(var i = 0; i < optionArr.length; i++){
					jsonCash[optionArr[i]] = true;
				};
			}
			

			var self = {
				add : function(){
					if(list){
						fireLength = list.length;
						(function add(args){
							$.each(args,function(i,value){
								if(typeof value === "function"){
									list.push(value);
								}else if($.type(value) === "array"){
									add(value);
								}
							})
						})(arguments)
					};

					if(memory){
						fireIndex = fireLength++;
						this.fire();
					}
				},

				remove : function(){
					$.each(arguments,function(i,value){
						var index;
						while(index = [].indexOf.call(list,value) > -1){
							list.splice(index,1);
						}
					});
					return this;
				},

				disable : function(){
					list = undefined;
				},

				has : function(arg){
					return list && $.inArray(arg,list) > -1;
				},

				fire : function(){
					if(!once){
						once = jsonCash.once;
						memory = jsonCash.memory;
						if(list && list.length){
							var i = fireIndex || 0;
							for(; i < list.length; i++){
								var result = list[i].apply(null,arguments);
								if(result === false && jsonCash.returnOnfalse){
									list = undefined;
									break;

								}
							}
						}
					}
				}
			}
			
			return self;

		}
		window.Callbacks = Callbacks;
	})(jQuery,window)