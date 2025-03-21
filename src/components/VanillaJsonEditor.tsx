import { useEffect, useRef } from "react";
import {
  createJSONEditor,
  JsonEditor,
  JSONEditorPropsOptional,
} from "vanilla-jsoneditor";

const VanillaJsonEditor: React.FC<JSONEditorPropsOptional> = (props) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const refEditor = useRef<JsonEditor | null>(null);

  useEffect(() => {
    // create editor
    refEditor.current = createJSONEditor({
      target: refContainer.current!,
      props: {},
    });

    return () => {
      // destroy editor
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // update props
    if (refEditor.current) {
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div className="w-full h-[96.5%]" ref={refContainer}></div>;
};

export default VanillaJsonEditor;
