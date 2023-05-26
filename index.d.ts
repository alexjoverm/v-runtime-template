declare namespace _default {
    namespace props {
        const template: StringConstructor;
        const parent: ObjectConstructor;
        namespace templateProps {
            export const type: ObjectConstructor;
            function _default(): {};
            export { _default as default };
        }
    }
    function render(): import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
}
export default _default;
