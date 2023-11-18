export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = (next === undefined ? null : next);
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  public size: number;
  constructor(array: T[]) {
    this.head = null;
    this.size = 0;
    if (array) {
      array.forEach(value => this.append(value))
    }
  }
  addByIndex(element: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new LinkedListNode(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let prev = null;
        let currIndex = 0;
        while (currIndex < index) {
          prev = curr;
          curr = curr!.next;
          currIndex++
        }
        node.next = curr;
        if (prev !== null) {
          prev.next = node
        }
      }
      this.size++;
    }
  }
  deleteByIndex(index: number) {
    if (index < 0 || index > this.size) {
      return;
    }
    let curr = this.head;
    let prev = null;
    let currIndex = 0;

    while (currIndex < index) {
      prev = curr;
      curr = curr!.next;
      currIndex++
    }
    if (prev === null) {
      this.head = curr!.next;
    } else {
      prev.next = curr!.next
    }
    this.size--;
  }

  append(element: T) {
    const node = new LinkedListNode(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new LinkedListNode(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      this.head = node;
      this.head.next = current;
    }
    this.size++
  }

  deleteHead() {
    if (!this.head) {
      return
    }
    this.head = this.head.next;
    this.size--
  }

  deleteTail() {
    if (!this.head) {
      return
    }
    let curr = this.head;
    let prev = null;

    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }

    if (prev === null) {
      this.head = null
    } else {
      prev.next = null;
    }

    this.size--;
  }

  toArray(): T[] {
    const res: T[] = [];
    let curr = this.head;

    while (curr) {
      res.push(curr.value);
      curr = curr.next
    }
    return res
  }

  getSize() {
    return this.head;
  }

}