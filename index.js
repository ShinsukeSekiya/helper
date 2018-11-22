

'use strict';
process.on('unhandledRejection', console.dir); // Node.jsで捕捉されなかったPromise内の例外をスタックトレースで表示する
const requester = require('request');
const fs = require("fs");
const crypto = require('crypto');
//const PromiseFtp = require('promise-ftp');
//const ftp = new PromiseFtp();
//const config = require('./config');
//const env= process.env.NODE_ENV || "staging";
const moment = require('moment');
var path = require('path');
var urlParser = require('url');

//
//
//
function Helper(){
	let items = {
		ucfirst: function(text){
			return text.substring(0, 1).toUpperCase() + text.substring(1);
		},
		fromYYYYMMDDHHmmssToDateTime: function (str){
			return str.replace(/(\w{4})(\w{2})(\w{2})(\w{2})(\w{2})(\w{2})/,"$1-$2-$3 $4:$5:$6");
		},
		fromYYYYMMDDToDateTime: function (str){
			return str.replace(/(\w{4})(\w{2})(\w{2})/,"$1-$2-$3 00:00:00");
		},
		existFile: function (file) {
			try {
				fs.statSync(file);
				return true;
			} catch(err) {
				// ファイルが無い
				if(err.code === 'ENOENT') return false
				// ファイルが無い以外のエラー
				throw err;
			}
		},
		isEmpty: val=>{
			return val === void 0 || val === null || val === 0 || val === "" || this.isEmptyObject(val) ;
		},
		isUndefined: val=>{
			return typeof val === void 0;
		},
		isString: val=>{
			return Object.prototype.toString.call(val) === "[object String]";
		},
		isArray: val=>{
			return Object.prototype.toString.call(val) === "[object Array]";
		},
		beArray: val=>{
			return this.isArray(val) ? val : [val];
		},
		isObject: val=>{
			return Object.prototype.toString.call(val) === "[object Object]";
		},
		isFunction: val=>{
			return Object.prototype.toString.call(val) === "[object Function]";
		},
		isEmptyObject: val=>{
			if  ( Object.prototype.toString.call( val ) == "[object Object]" ) {
				if ( Object.keys( val ).length == 0 ){
					return true;
				}
			}
			return false;
		},
		random : function (min, max) {
				return  Math.floor(Math.random() * ((max+1) - min) + min );
		} ,
		isArguments: function(o){
			return helper.is(o) === '[object Arguments]';
		},
		/*eachAttrs: function( obj ){
			obj.
			return {
				items: obj.keys(),
				idx: 0,
				next: function(){
					let res ={ value: this.items[this.idx], done: !( this.idx < this.items.length) };
					this.idx++;
					return res;
				},
				[Symbol.iterator]: function(){
					return this;
				}
			}
		},*/
	}//items;

	for( k in items ) this.add( k, items[k] );
};
Helper.prototype = {
	add: function( key ,fnc ){
		this[key] = fnc;
	}
};

module.exports = new Helper();
