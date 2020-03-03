let mainController = function ($scope) {
    var vm = this;
    vm.cities = [];
    vm.columnModel = new KVC("",0,"#000000");
    vm.columns = new Dictionary();
    $('#turkiye').children().each((index, item) => {
        vm.cities.push({ id: item.id, name: item.dataset['iladi'], data: new Dictionary() });
    });

    vm.addColumn = function () {
        vm.columns.push(vm.columnModel);
        vm.columnModel = new KVC("",0,"#000000");
        compileColumns();
    };

    vm.removeColumn = function(i) {
        vm.columns.splice(i, 1);
        compileColumns();
    }

    var compileColumns = function()
    {
        for (var i = 0; i < vm.cities.length; i++) {
            vm.cities[i].data.clear();
            var cloneColumns = vm.columns.clone();
            for(var j = 0;j < cloneColumns.length;j++)
            {
                vm.cities[i].data.add(cloneColumns[j].clone());
            }
        }
    }

    var compileMap = function(){
        for(var i = 0;i < vm.cities.length;i++)
        {
            if(vm.columns.length > 0)
            {
                $("#turkiye > #"+ vm.cities[i].id).css('fill', vm.cities[i].data.getMost().color);
            }
        }
    }
  
    setInterval(() => {
        compileMap();
    }, 1000);
    // $scope.$watch('vm.cities', function(oldVal, newVal){
    //     compileMap();
    // });
};

statisticApp.controller("mainController", mainController);

class Dictionary extends Array {
    add(item) {
        if (typeof item === typeof new KVC())
            this.push(item);
    }
    clear(){
        this.length = 0;
    }
    clone(){
        return this.map((x)=>x);
    }
    getMost(){
        var result;
        var max = Math.max.apply(null, this.map((x) => { return parseInt(x.value);}));
        this.forEach((item) => {
           if(item.value === max)
           {
                result = item;
           }
        });
        return result;
    }
    getValue(key) {
        var result;
        this.forEach((item) => {
            if (item.key === key) {
                result = item.value;
            }
        });
        return result;
    }
    setValue(key, value) {
        this.forEach((item) => {
            if (item.key === key) {
                item.value = value;
            }
        });
    }
}

class KVC {
    constructor(key, value, color) {
        this.key = key;
        this.value = value;
        this.color = color;
    }
    clone(){
        return new KVC(this.key,this.value,this.color);
    }
    get _key() {
        return this.key;
    }
    set _key(x) {
        this.key = x;
    }
    get _value() {
        return this.value;
    }
    set _value(x) {
        this.value = x;
    }
    get _color() {
        return this.color;
    }
    set _color(x) {
        this.color = x;
    }
}
