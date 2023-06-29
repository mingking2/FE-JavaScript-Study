import {initEvent} from './event.js';
import {addTodo} from './todo.js';
import {renderTodo} from './todo.js';
import {initTodoEvent} from './todo.js';
import {initClock} from './clock.js';

function init(){ //최초 실행 함수

    const Todo = class { //Todo list를 담기 위한 클래스
        
        static DEFAULT_MODE= Object.freeze({
            set : function(){
                Todo.mode = 'ALL';
            },
            get : function(){
                return 'ALL';
            },
        });

        static ALL_MODE= Object.freeze({
            set : function(){
                Todo.mode = 'ALL';
            },
            get : function(){
                return 'ALL';
            },
        });

        static ACTIVE_MODE= Object.freeze({
            set : function(){
                Todo.mode = 'ACTIVE';
            },
            get : function(){
                return 'ACTIVE';
            },
        });

        static COMPLETED_MODE= Object.freeze({
            set : function(){
                Todo.mode = 'COMPLETED';
            },
            get : function(){
                return 'COMPLETED';
            },
        });

        static mode = 'ALL';
        static todoItems = []; //Todo의 정보들을 리스트형태로 저장

        constructor(content, state = false){
            this.content = content;
            this.state = state;
            Todo.todoItems.unshift(this);
        }

        getOrder(){
            return Todo.todoItems.indexOf(this);
        }
    
        static has(value){
            const todoArray = Array.from(Todo.todoItems, (v) => v.content);
            if (todoArray.includes(value)){
                return true;
            }
            return false;
        }
    
        static get(idx){
            return Todo.todoItems[idx];
        }
    
        static remove(idx){
            Todo.todoItems.splice(idx, 1);
        }
    
        static clear(){
            Todo.todoItems = [];
        }
    
    }
    
    // 실시간 타이머 표시
    initClock();
    //Todo 리스트 이벤트 추가 함수
    initTodoEvent(Todo);
    //입력 버튼 및 보기 버튼 이벤트 추가 함수
    initEvent(Todo, addTodo, renderTodo);
}

document.addEventListener('load',init());