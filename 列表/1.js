1 //��ʼ������
2 multiSelectColInit();
3 //����������ѡ����¼��Լ���Ӧ����
4
5 function multiSelectColInit() {
    6     multiSelect = {
        7         //ajaxmodelnames: [], //��jqgrid��ͷ���ƶ�Ӧ��id�������ڴ�����̨
        8         contorlJqgridCol: function(names, modelnames, kehuSelectHides, ajaxHideIds) {
        9             var self = $("input[data-multiselect]"),
            10                 selfHei = self.outerHeight(true), //���input�ĸ߶�
            11                 self_offset_top = self.offset().top,
            12                 self_left = self.offset().left,
            13                 selectHides = selectSames(modelnames, kehuSelectHides),
            14                 self_top = self_offset_top   selfHei,
            15                 multi_select = '<div class=multiSelect><ul><li class="ckAllLi"><input type="checkbox" checked="true" class="ckAllBox">ȫѡ</li>',
            16                 len = names.length, //������
            17                 hideLen = selectHides.length, //���ص�����
            18                 showLen = len - hideLen, //��ʾ������
            19                 selfStr = '����'   len   '�У���ʾ'   showLen   '�У�����'   hideLen   '��', //17.5.4����
            20                 //ajaxnames = [], //��jqgrid��ͷ�����������ڴ�����̨
        21                 ajaxmodelnames = selectHides; //��jqgrid��ͷ���ƶ�Ӧ��id�������ڴ�����̨
        22             if (hideLen > 0) {
            23                 multi_select = '<div class=multiSelect><ul><li class="ckAllLi"><input type="checkbox" class="ckAllBox">ȫѡ</li>';
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
        39             //�������μ���input������ʾ�ж����У�������Ĭ��û����ʾ
        40             self.val(selfStr);
        41             self.attr('showcol', showLen);
        42             //17-5-8 �������ڴ�С�ı��¼����¶�λ��ѡ��
        43             $(window).resize(function () {
            44                 if ($('.multiSelect').length) {
                45                     var selfHei = self.outerHeight(true), //���input�ĸ߶�
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
                67                     $('.multiSelect').hide(function() { //�ص��Ƿ񱣴�����
                    68                         ajaxHideIds(ajaxmodelnames);
                    69                     });
                70                 }
            71             })
        72             $(".multiCheckBox").click(function(e) {
            73                 stopPropagation(e);
            74                 var val = $(this).attr("value"),
                75                     showcol = parseInt(self.attr('showcol')),
                76                     newshowcol = 0;
            77                 if(!$(this).prop("checked")) { //�����ǰѡ��
                78                     $("#gridlist").jqGrid('hideCol', val);
                79                     newshowcol = showcol - 1;
                80                     ajaxmodelnames.push(val);
                81                 } else {
                82                     $("#gridlist").jqGrid('showCol', val);
                83                     newshowcol = showcol   1;
                84                     ajaxmodelnames.remove(val);
                85                 }
            86                 var newnoshowcol = len - newshowcol;
            87                 selfStr = '����'   len   '�У���ʾ'   newshowcol   '�У�����'   newnoshowcol   '��'; //17.5.4����
            88                 self.val(selfStr);
            89                 self.attr('showcol', newshowcol);
            90             })
        91             $('.multiLi,.ckAllLi').click(function (e) {
            92                 stopPropagation(e);
            93                 var ChildInput = $(this).find('input');
            94                 ChildInput.trigger('click');
            95             })
        96             $(".ckAllBox").click(function (e) {//ȫѡinput��ȫѡ����¼�
            97                 stopPropagation(e);
            98                 if ($(this).prop("checked")) {//Ӧ��ȫ������
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
    117         jqgridHiddenColInit: function(opt, modelnames, kehuSelectHides) { //optΪ�����jqgrid��option.model
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
135 function selectSames(arr1, arr2) { //ѡ��ǰ��2���������ظ��ĸ�ֵ����������������
    136     //arr1��jqgrid�Դ�������modelname��id����
    137     //arr2�ǿͻ�ѡ�����Ҫ���ص�jqgrid��id����
    138     //arr3�Ƿ���2���������ظ���id����
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