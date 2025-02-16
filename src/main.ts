class El {
    next: El | null;
    prev: El | null;
    value: number;
    constructor(
         value: number
    ) {
        this.value = value
        this.next = null
        this.prev = null
    }
}

class LinkedList {
    head: El  | null;
    tail: El  | null;
    constructor(
        value: number,
    ) {
        this.head = new El(value);
        this.tail = this.head
    }

    // Добавление узла в конец списка
    append(value: number) {
        const newNode = new El(value);
        newNode.prev = this.tail
        newNode.prev!.next = newNode
        this.tail = newNode;
        return this;
    }

    // Добавление узла в начало списка
    prepend(value: number) {
        const newNode = new El(value);
        newNode.next = this.head
        this.head!.prev = newNode
        this.head = newNode
        return this;
    }

    // Удаление всех узлов, которые имеют указанное значени
    delete(value: number) {
        const checkNode = (currentNode: El) => {
            if(currentNode.value === value){
                // если элемент первый
                if(currentNode === this.head){
                    if(this.head.next){
                        this.head = this.head.next;
                    }else{
                        this.head = null
                        this.tail = null
                    }
                }
                // если элемент последний
                else if(currentNode === this.tail){
                    currentNode.prev!.next = null
                    this.tail = currentNode.prev
                }else{
                    currentNode.prev!.next = currentNode.next
                    currentNode.next!.prev = currentNode.prev
                }
            }

            if(currentNode.next){
                checkNode(currentNode.next)
            }
        }

        if (!this.head) {
            return null;
        }else{
            checkNode(this.head)
        }
        return this;
    }

    // Находит первый узел с таким же значением
    find(value: number) {
        const checkNode = (currentNode: El) => {
            if(currentNode.value === value) {
                return currentNode;
            }

            if(currentNode.next){
                checkNode(currentNode.next)
            }
        }

        if (!this.head) {
            return null;
        }
        console.log ('find', checkNode(this.head))

    }

    // Удаляет последний узел из списка
    deleteTail() {
        if (!this.tail) {
            return null;
        }
        this.tail.prev!.next = null
        this.tail = this.tail.prev
        return this;
    }

    // Удаляет первый узел из списка
    deleteHead() {
        if (!this.head) {
            return null;
        }
        this.head.next!.prev = null
        this.head = this.head.next
        return this
    }

    // Принимает массив значений и создаёт новые узлы из каждого элемента массива, добавляя их в конец списка
    fromArray(arr: Array<number>) {
        arr.forEach((element) => {
            this.append(element)
        })
        return this
    }

    // Создаёт массив из всех узлов
    toArray(){
        const arr:Array<number> = []
        const checkNode = (currentNode: El) => {
            if(currentNode.value) {
                arr.push(currentNode.value)
            }
            if(currentNode.next){
                checkNode(currentNode.next)
            }
            return arr
        }

        if (!this.head) {
            return null;
        }
        console.log ('toArray', checkNode(this.head))
    }

    // Создаёт обратный список, меняя узлы местами.
    reverse() {
        const checkNode = (currentNode: El) => {
            if(currentNode.next){
                checkNode(currentNode.next)
            }else{
                this.head = currentNode
            }

            if(!currentNode.prev){
                this.tail = currentNode
            }
            const prevEl = currentNode.prev
            currentNode.prev = currentNode.next
            currentNode.next = prevEl
        }

        if(!this.tail){
            return null;
        }

        checkNode(this.head!)

        return this;
    }
    // Вывод
    _print() {
        const viewNodes = (currentNode: El) => {
            console.log(currentNode.value)
            if(currentNode.next){
                viewNodes(currentNode.next)
            }
        }

        if(!this.head){
            console.log(this)
        }else{
            console.log('HEAD', this.head.value)
            viewNodes(this.head)
            console.log('TAIL', this.tail!.value)
        }
    }
}

let list = new LinkedList(2);
list.fromArray([7,6,5,4,3,2,1])
list.toArray();
list.reverse();
list.append(3)
list.append(7)
list.append(1)
list.prepend(11)
list.find(11)
list.deleteTail()
list.deleteHead()
list.delete(3)
list.delete(2)
list.delete(7)
list.delete(1)
list.delete(11)
list.delete(12)
list._print()