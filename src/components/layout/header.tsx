'use client'

import Link from 'next/link'
import { ShoppingCart, Search, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useCart } from '@/contexts/cart-context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface User {
  role: 'ADMIN' | 'USER';
  // 다른 사용자 속성들...
}

export function Header() {
  const { itemCount } = useCart()
  const user: User | null = null; // 임시로 로그아웃 상태 설정. 실제 앱에서는 useSession() 등으로 교체해야 합니다.
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 왼쪽: 로고 */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <nav className="grid gap-2 py-6">
                  <Link href="/categories/electronics" className="text-sm font-medium hover:text-primary">
                    전자제품
                  </Link>
                  <Link href="/categories/fashion" className="text-sm font-medium hover:text-primary">
                    패션
                  </Link>
                  <Link href="/categories/home" className="text-sm font-medium hover:text-primary">
                    홈 & 리빙
                  </Link>
                  <Link href="/categories/books" className="text-sm font-medium hover:text-primary">
                    도서
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">SI Commerce</span>
            </Link>
          </div>

          {/* 중앙: 네비게이션 메뉴 */}
          <nav className="hidden md:flex items-center space-x-8 mx-auto">
            <Link href="/categories/electronics" className="text-sm font-medium hover:text-primary transition-colors">
              전자제품
            </Link>
            <Link href="/categories/fashion" className="text-sm font-medium hover:text-primary transition-colors">
              패션
            </Link>
            <Link href="/categories/home" className="text-sm font-medium hover:text-primary transition-colors">
              홈 & 리빙
            </Link>
            <Link href="/categories/books" className="text-sm font-medium hover:text-primary transition-colors">
              도서
            </Link>
          </nav>

          {/* 오른쪽: 검색 및 사용자 메뉴 */}
          <div className="flex items-center gap-4">
          {/* 검색 */}
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-transparent border-none p-0 cursor-pointer">
              <Search className="h-4 w-4" />
            </button>
            <Input
              placeholder="상품을 검색하세요..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-4">
          {/* 장바구니 */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* 사용자 메뉴 */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">프로필</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">주문 내역</Link>
                </DropdownMenuItem>
                {user && user.role === 'ADMIN' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/admin">관리자 페이지</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => alert('로그아웃 처리!')}>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/signin">
                <Button variant="outline">로그인</Button>
            </Link>
          )}
          </div>
          </div>
        </div>
      </div>
    </header>
  )
}
