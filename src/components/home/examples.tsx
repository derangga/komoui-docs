import { forwardRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy } from "lucide-react";

const codeExamples = {
  react: `// shadcn/ui (React)
import { Button } from "@/components/ui/button"

export function MyButton() {
  return (
    <Button variant="default" size="lg">
      Click me
    </Button>
  )
}`,
  kotlin: `// komoui (Kotlin)
import com.komoui.components.Button
import com.komoui.components.ButtonDefaults

@Composable
fun MyButton() {
    Button(
        onClick = { /* handle click */ },
        variant = ButtonDefaults.Default,
        size = ButtonDefaults.Large
    ) {
        Text("Click me")
    }
}`,
};

export const Examples = forwardRef<HTMLElement>(function Examples(_, ref) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  return (
    <section id="examples" ref={ref} className="py-20 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Familiar Syntax, Native Performance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            If you know shadcn/ui, you already know komoui. Same components,
            same patterns, optimized for Kotlin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                  React (shadcn/ui)
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(codeExamples.react, "react")}
                >
                  {copiedCode === "react" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto h-80">
                <code className="text-sm font-mono">{codeExamples.react}</code>
              </pre>
            </CardContent>
          </Card>

          <Card className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
                  Kotlin (komoui)
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(codeExamples.kotlin, "kotlin")}
                >
                  {copiedCode === "kotlin" ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto h-80">
                <code className="text-sm font-mono">{codeExamples.kotlin}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});
