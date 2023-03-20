import { FormControl } from '@angular/forms';

export function requiredFileType( requiredType: string ) {
  return function (control: FormControl) {
    const file = control.value;
    if ( file ) {
      const loadedType = file.type.split('/')[0].toLowerCase();
      console.log(loadedType)
      if ( requiredType.toLowerCase() !== loadedType.toLowerCase() ) {
        return {
          requiredFileType: true
        };
      }
      
      return null;
    }

    return null;
  };
}