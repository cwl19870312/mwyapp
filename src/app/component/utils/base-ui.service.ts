import { Injectable, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable()
export class BaseUiService {

    constructor(
        protected resolver: ComponentFactoryResolver,
        protected applicationRef: ApplicationRef,
        protected injector: Injector
    ) { }

    /** 动态构建组件 */
    protected build<T>(component: { new(...args: any[]): T; }): ComponentRef<T> {
        let componentFactory = this.resolver.resolveComponentFactory(component);
        let componentRef = componentFactory.create(this.injector);
        let componentRootNode = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.applicationRef.attachView(componentRef.hostView);
        componentRef.onDestroy(() => {
            this.applicationRef.detachView(componentRef.hostView);
        });
        document.body.appendChild(componentRootNode);
        return componentRef;
    }

}