import { HttpClient, HttpXhrBackend } from '@angular/common/http';

export class TypeaheadItem {
  constructor(id: string, displayName: string, imageUrl?: string, itemType?: string) {
    this.id = id;
    this.displayName = displayName;
    this.itemType = itemType;
    this.imageUrl = imageUrl;
  }
  id: string;
  displayName: string;
  itemType: string;
  imageUrl: string;
}

export class TypeaheadImage {
  constructor(imageUrl: string, objectUrl: string) {
    this.objectUrl = objectUrl;
    this.imageUrl = imageUrl;
  }
  objectUrl: string;
  imageUrl: string;
}

export interface ITypeaheadCollection {
  Add(key: string, value: TypeaheadItem);
  ContainsKey(key: string): boolean;
  Count(): number;
  Item(key: string): TypeaheadItem;
  Keys(): string[];
  Remove(key: string): TypeaheadItem;
  Values(): TypeaheadItem[];
  SortedValues: TypeaheadItem[];
}

const http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));

export class TypeaheadCollection implements ITypeaheadCollection {

  private items: { [index: string]: TypeaheadItem } = {};
  private images: { [index: string]: string } = {};
  private count: number = 0;

  public SortedValues: TypeaheadItem[] = [];

  constructor(array: any[], idFieldName?: string, displayNameFieldName?: string, imageUrl?: string, itemType?: string) {
    this.AddArray(array, idFieldName, displayNameFieldName, imageUrl, itemType);
  }

  public GetImageUrl(imageUrl: string): string {
    if (this.images.hasOwnProperty(imageUrl)) {
      return this.images[imageUrl];
    }
    else {
      return imageUrl;
    }
  }

  public ContainsKey(key: string): boolean {
    return this.items.hasOwnProperty(key);
  }

  public Count(): number {
    return this.count;
  }

  public Add(key: string, value: TypeaheadItem) {
    if (!this.items.hasOwnProperty(key))
      this.count++;

    this.items[key] = value;
  }

  public AddArray(array: any[], id?: string, displayName?: string, imageUrl?: string, itemType?: string) {
    array.forEach(item => {
      if (displayName && id) {
        this.Add(item[id], new TypeaheadItem(item[id], item[displayName], imageUrl, itemType))
      }
      else {
        this.Add(item, new TypeaheadItem(item, item, imageUrl, itemType))
      }        
    });

    if (imageUrl && !this.images.hasOwnProperty(imageUrl)) {
      http.get(this.absolutePath(imageUrl), {responseType: "blob"})
        .subscribe(response => {          
          let urlCreator = window.URL;
          let theUrl = urlCreator.createObjectURL(response);
          this.images[imageUrl] = theUrl;
        });
    }

    this.SortedValues = this.getSortedValues();
  }

  private absolutePath(href : string) : string {
    var link = document.createElement("a");
    link.href = href;
    return link.href;
  }

  public Remove(key: string): TypeaheadItem {
    var val = this.items[key];
    delete this.items[key];
    this.count--;
    return val;
  }

  public Item(key: string): TypeaheadItem {
    return this.items[key];
  }

  public Keys(): string[] {
    var keySet: string[] = [];

    for (var prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        keySet.push(prop);
      }
    }

    return keySet;
  }

  public Values(): TypeaheadItem[] {
    var values: TypeaheadItem[] = [];

    for (var prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        values.push(this.items[prop]);
      }
    }

    return values;
  }
  private getSortedValues(): TypeaheadItem[] {
    var values: TypeaheadItem[] = [];

    for (var prop in this.items) {
      if (this.items.hasOwnProperty(prop)) {
        values.push(this.items[prop]);
      }
    }

    return values.sort((n1, n2) => {
      if (n1.displayName > n2.displayName) {
        return 1;
      }

      if (n1.displayName < n2.displayName) {
        return -1;
      }

      return 0;
    });
  }
}

export interface ITypeaheadImages {
  [key: string]: string,
}
