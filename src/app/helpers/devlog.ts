import { isDevMode } from '@angular/core';

// Console.log only if in dev mode.
export function devlog(input) {
    if(isDevMode()) {
        console.log(input);
    }
}