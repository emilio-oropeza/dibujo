(function($){
	$.fn.juansketch = function(){
		return this.each(function() {
			var element = $(this);						
			if (element.data('juansketch')) return;
			var myplugin = new juansketch(this);
			element.data('juansketch', myplugin);
			element.data('juansketch').methods.init();
			
		});
	};
	
	var juansketch = function(target){
		var componentObj = {
			methods:{
				init:function(){
					componentObj.methods.pointers();
					componentObj.methods.choose($("#tool_color"), true);
					componentObj.methods.choose($("#tool_size"), false);
					$("#tool_menu").on("click", function(){
						$("#canvas_share").toggle();
					});
				},
				choose: function(option, color){
					$(option).on("click", function(){
						if($(option).hasClass("active")){
							componentObj.methods.close_options(option);													
						}else{
							componentObj.methods.open_options(option);
							$(option).find(".options").find("a").each(function(){
								$(this).on("click", function(){
									if(color){
										componentObj.methods.choose_color(this);
									}else{
										componentObj.methods.choose_size(this);
									}
								});								
							});
						}
					});
				},
				choose_color: function(a){
					var choose = $(a).attr("data-color");
					var color = "azul";
					if(choose === "#E04646"){
						color = "rojo";
					}
					$("#tool_color").css({'background-image': 'url("images/btns/btn_active_'+color+'.png")'});
				},
				choose_size: function(a){
					var choose = $(a).attr("data-size");
					var size_marker = $("#tool_size").find("#principal_marker");
					$(size_marker).attr('class', '');
					$(size_marker).addClass("size_marker");
					$(size_marker).addClass("size"+choose);
					
				},
				open_options:function(option){
					$(option).addClass("active");
					$(option).find(".options").fadeIn("slow");
				},
				close_options: function(option){
					$(option).find(".options").fadeOut("fast");
					setTimeout(function(){
						$(option).removeClass("active");	
					}, 500);
				},
				pointers: function(){
					$(".pointer").on("click", function(){
						$(this).addClass("active");
						if($(this).attr("id") == "tool_pluma"){
							$("#tool_eraser").removeClass("active");
						}else{
							$("#tool_pluma").removeClass("active");
						}
					});
				},

			}
		};
		return componentObj;
	};	
})(jQuery);
$(document).ready(function(){
	$("#canvas_sketch").juansketch();

    var c = $('#canvas_sketch');
    var ct = c.get(0).getContext('2d');
    var container = $(c).parent();
    $(window).resize( respondCanvas );
    function respondCanvas(){ 
        c.attr('width', $(container).width() ); 
        c.attr('height', $(container).height() ); 
    }
    respondCanvas();

    $('#canvas_sketch').sketch({defaultColor:"#2753DD"});
}); 