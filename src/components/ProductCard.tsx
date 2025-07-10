import { Button } from "./ui/button"
import {
  Card,
  CardContent,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function ProductCard({product}:{product:any}) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <img src={product.images[0] ? product.images[0] : "./example.png"} alt={product.title} className="rounded-lg" />
        <div className="mt-4">
            <p className="font-semibold text-lg">{product.title}</p>
            <p className="max-h-[200px] overflow-y-auto text-gray-700 dark:text-gray-400">{product.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
