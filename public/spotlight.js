!function(e){var n={};function t(s){if(n[s])return n[s].exports;var i=n[s]={i:s,l:!1,exports:{}};return e[s].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=e,t.c=n,t.d=function(e,n,s){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:s})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(t.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(s,i,function(n){return e[n]}.bind(null,i));return s},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="/",t(t.s=0)}([function(e,n,t){e.exports=t(1)},function(e,n){window.LivewireUISpotlight=function(e){return{searchPlaceholder:e.placeholder,searchEngine:"commands",commands:e.commands,commandSearch:null,selectedCommand:null,dependencySearch:null,dependencyQueryResults:window.Livewire.find(e.componentId).entangle("dependencyQueryResults"),requiredDependencies:[],currentDependency:null,resolvedDependencies:{},init:function(){var e=this;this.commandSearch=new Fuse(this.commands,{threshold:.3,keys:["name","description"]}),this.dependencySearch=new Fuse([],{threshold:.3,keys:["name","description"]}),this.$watch("dependencyQueryResults",(function(n){e.dependencySearch.setCollection(n)})),this.$watch("search",(function(e){0===e.length&&(selected=0)})),this.$watch("search",(function(n){null!==e.selectedCommand&&null!==e.currentDependency&&e.$wire.searchDependency(e.selectedCommand.id,e.currentDependency.id,n,e.resolvedDependencies)}))},isOpen:!1,toggleOpen:function(){var e=this;this.isOpen?this.isOpen=!1:(this.search="",this.isOpen=!0,setTimeout((function(){e.$refs.search.focus()}),100))},search:"",filteredItems:function(){return"commands"===this.searchEngine?this.commandSearch.search(this.search).map((function(e,n){return[e,n]})):this.dependencySearch.search(this.search).map((function(e,n){return[e,n]}))},selectUp:function(){var e=this;this.selected=Math.max(0,this.selected-1),this.$nextTick((function(){e.$refs.results.children[e.selected+1].scrollIntoView({block:"nearest"})}))},selectDown:function(){var e=this;this.selected=Math.min(this.filteredItems().length-1,this.selected+1),this.$nextTick((function(){e.$refs.results.children[e.selected+1].scrollIntoView({block:"nearest"})}))},go:function(n){var t=this;null===this.selectedCommand&&(this.selectedCommand=this.commands.find((function(e){return e.id===(n||t.filteredItems()[t.selected][0].item.id)})),this.requiredDependencies=JSON.parse(JSON.stringify(this.selectedCommand.dependencies))),null!==this.currentDependency&&(this.resolvedDependencies[this.currentDependency.id]=n||this.filteredItems()[this.selected][0].item.id),this.requiredDependencies.length>0?(this.search="",this.searchEngine="dependencies",this.currentDependency=this.requiredDependencies.pop(),this.searchPlaceholder=this.currentDependency.placeholder):(this.isOpen=!1,this.$wire.execute(this.selectedCommand.id,this.resolvedDependencies),setTimeout((function(){t.search="",t.searchPlaceholder=e.placeholder,t.searchEngine="commands",t.resolvedDependencies={},t.selectedCommand=null,t.currentDependency=null,t.selectedCommand=null,t.requiredDependencies=[]}),300))},selected:0}}}]);