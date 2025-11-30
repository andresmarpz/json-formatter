import * as ToolbarPrimitive from "@radix-ui/react-toolbar";

interface Props
  extends React.ComponentProps<typeof ToolbarPrimitive.Root>,
    React.PropsWithChildren {}
function Toolbar({ children, ...props }: Props) {
  return <ToolbarPrimitive.Root {...props}>{children}</ToolbarPrimitive.Root>;
}

export { Toolbar };
