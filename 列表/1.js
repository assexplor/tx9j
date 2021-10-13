1 //初始化函数
2 multiSelectColInit();
3 //调用下拉多选点击事件以及对应传参
4
5 function multiSelectColInit() {
    6     multiSelect = {
        7         //ajaxmodelnames: [], //此jqgrid列头名称对应的id数组用于传给后台
        8         contorlJqgridCol: function(names, modelnames, kehuSelectHides, ajaxHideIds) {
        9             var self = $("input[data-multiselect]"),
            10                 selfHei = self.outerHeight(true), //点击input的高度
            11                 self_offset_top = self.offset().top,
            12                 self_left = self.offset().left,
            13                 selectHides = selectSames(modelnames, kehuSelectHides),
            14                 self_top = self_offset_top   selfHei,
            15                 multi_select = '<div class=multiSelect><ul><li class="ckAllLi"><input type="checkbox" checked="true" class="ckAllBox">全选</li>',
            16                 len = names.length, //总列数
            17                 hideLen = selectHides.length, //隐藏的列数
            18                 showLen = len - hideLen, //显示的列数
            19                 selfStr = '共有'   len   '列，显示'   showLen   '列，隐藏'   hideLen   '列', //17.5.4新增
            20                 //ajaxnames = [], //此jqgrid列头名称数组用于传给后台
        21                 ajaxmodelnames = selectHides; //此jqgrid列头名称对应的id数组用于传给后台
        22             if (hideLen > 0) {
            23                 multi_select = '<div class=multiSelect><ul><li class="ckAllLi"><input type="checkbox" class="ckAllBox">全选</li>';
            24             }
        25             for(i = 0; i < len; i  ) {
            26                 if(selectHides.indexOf(modelnames[i]) > -1) {
                27                     multi_select  = '<li class="multiLi"><input type="checkbox" value='   modelnames[i]   ' class="multiCheckBox">'   names[i]   '</li>';
                28                 } else {
                29                     multi_select  = '<li class="multiLi"><input type="checkbox" checked="true" value='   modelnames[i]   ' class="multiCheckBox">'   names[i]   '</li>';
                30                 }
            31
            32             }
        33             multi_select  = '</ul></div>';
        34             $('body').append(multi_select);
        35             $('.multiSelect').css({
            36                 'top': self_top,
            37                 'left': self_left
        38             });
        39             //新增初次加载input框内显示有多少列，多少列默认没有显示
        40             self.val(selfStr);
        41             self.attr('showcol', showLen);
        42             //17-5-8 新增窗口大小改变事件重新定位多选框
        43             $(window).resize(function () {
            44                 if ($('.multiSelect').length) {
                45                     var selfHei = self.outerHeight(true), //点击input的高度
                    46                     self_offset_top = self.offset().top,
                    47                     self_left = self.offset().left,
                    48                     self_top = self_offset_top   selfHei;
                49                     $('.multiSelect').css({
                    50                         'top': self_top,
                    51                         'left': self_left
                52                     });
                53                 }
            54
            55             });
        56             $("input[data-multiselect]").click(function(e) {
            57                 stopPropagation(e);
            58                 if($('.multiSelect').length) {
                59                     $('.multiSelect').show();
                60                 }
            61             })
        62             $('.multiSelect').click(function(e) {
            63                 stopPropagation(e);
            64             })
        65             $(document).on("click", function() {
            66                 if($('.multiSelect').length && $('.multiSelect').is(":visible")) {
                67                     $('.multiSelect').hide(function() { //回调是否保存数据
                    68                         ajaxHideIds(ajaxmodelnames);
                    69                     });
                70                 }
            71             })
        72             $(".multiCheckBox").click(function(e) {
            73                 stopPropagation(e);
            74                 var val = $(this).attr("value"),
                75                     showcol = parseInt(self.attr('showcol')),
                76                     newshowcol = 0;
            77                 if(!$(this).prop("checked")) { //如果当前选中
                78                     $("#gridlist").jqGrid('hideCol', val);
                79                     newshowcol = showcol - 1;
                80                     ajaxmodelnames.push(val);
                81                 } else {
                82                     $("#gridlist").jqGrid('showCol', val);
                83                     newshowcol = showcol   1;
                84                     ajaxmodelnames.remove(val);
                85                 }
            86                 var newnoshowcol = len - newshowcol;
            87                 selfStr = '共有'   len   '列，显示'   newshowcol   '列，隐藏'   newnoshowcol   '列'; //17.5.4新增
            88                 self.val(selfStr);
            89                 self.attr('showcol', newshowcol);
            90             })
        91             $('.multiLi,.ckAllLi').click(function (e) {
            92                 stopPropagation(e);
            93                 var ChildInput = $(this).find('input');
            94                 ChildInput.trigger('click');
            95             })
        96             $(".ckAllBox").click(function (e) {//全选input的全选点击事件
            97                 stopPropagation(e);
            98                 if ($(this).prop("checked")) {//应该全部隐藏
                99                     $(".multiCheckBox").each(function (index, obj) {
                    100                         var _this = $(obj);
                    101                         if (!_this.prop("checked")) {
                        102                             _this.trigger("click");
                        103                         }
                    104                     })
                105
                106                 } else {
                107                     $(".multiCheckBox").each(function (index, obj) {
                    108                         var _this = $(obj);
                    109                         if (_this.prop("checked")) {
                        110                             _this.trigger("click");
                        111                         }
                    112                     })
                113                 }
            114             })
        115
        116         },
    117         jqgridHiddenColInit: function(opt, modelnames, kehuSelectHides) { //opt为传入的jqgrid的option.model
        118             var objModel = opt,
            119                 objModelLen = objModel.length;
        120             for(var k = 0; k < objModelLen; k  ) {
            121                 if(selectSames(modelnames, kehuSelectHides).indexOf(objModel[k].name) > -1) {
                122                     objModel[k].hidden = true;
                123                 }
            124             }
        125             return objModel;
        126         }
    127     }
    128
    129 }
130
131 function stopPropagation(e) {
    132     window.event ? window.event.cancelBubble = true : e.stopPropagation();
    133 }
134
135 function selectSames(arr1, arr2) { //选择前面2个数组中重复的赋值给第三个参数数组
    136     //arr1是jqgrid自带的所有modelname的id集合
    137     //arr2是客户选择的需要隐藏的jqgrid的id集合
    138     //arr3是返回2个数组中重复的id集合
    139     var arr3 = [];
    140     for(var s in arr1) {
        141         for(var x in arr2) {
            142             if(x != 'remove') {
                143                 if(arr2[x] == arr1[s]) {
                    144                     arr3.push(arr1[s]);
                    145                 }
                146             }
            147         }
        148     }
    149     return arr3;
    150 }
151
152 Array.prototype.indexOf = function(val) {
    153     for(var i = 0; i < this.length; i  ) {
        154         if(this[i] == val) return i;
        155     }
    156     return -1;
    157 };
158 Array.prototype.remove = function(val) {
    159     var index = this.indexOf(val);
    160     if(index > -1) {
        161         this.splice(index, 1);
        162     }
    163 };