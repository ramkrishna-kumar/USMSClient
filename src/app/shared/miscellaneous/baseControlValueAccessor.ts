import { ControlValueAccessor } from '@angular/forms';
export class BaseControlValueAccessor<T> implements ControlValueAccessor {
    public disabled = false;
    /**
    * Call when value has changed programmatically
    */
    public onChange(newVal: T) {}
    public onTouched(_?: any) {}
  public _value: T;

  public set value(value: T) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  public get value() : T {
    return this._value;    
  }
    /**
    * Model -> View changes
    */
  public writeValue(obj: T): void
  {
    this._value = obj;
  }
    public registerOnChange(fn: any): void { this.onChange = fn; }
    public registerOnTouched(fn: any): void { this.onTouched = fn; }
    public setDisabledState?(isDisabled: boolean): void { this.disabled = isDisabled; }
}
