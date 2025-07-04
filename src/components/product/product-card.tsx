import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    salePrice?: number
    images: string[]
    status: string
    stock: number
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.salePrice && product.salePrice < product.price
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(price)
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.images[0] || '/placeholder-product.svg'}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-red-500">
            -{discountPercentage}%
          </Badge>
        )}
        
        {product.stock === 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            품절
          </Badge>
        )}

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-sm mb-2 line-clamp-2 hover:text-primary">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-red-500">
                  {formatPrice(product.salePrice!)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          <Button 
            size="sm" 
            className="h-8"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            담기
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
