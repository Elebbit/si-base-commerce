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

export function Header() {
  // TODO: 실제 장바구니 아이템 수와 사용자 정보를 가져와야 함
  const cartItemCount = 0
  const user = null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* 로고 */}
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

        {/* 네비게이션 메뉴 (데스크톱) */}
        <nav className="hidden md:flex items-center space-x-6">
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

        {/* 검색 */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="상품을 검색하세요..."
              className="pl-10"
            />
          </div>
        </div>

        {/* 우측 메뉴 */}
        <div className="flex items-center space-x-4">
          {/* 장바구니 */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* 사용자 메뉴 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {user ? (
                <>
                  <DropdownMenuItem>
                    <Link href="/profile">프로필</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders">주문 내역</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>로그아웃</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <Link href="/auth/signin">로그인</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/auth/signup">회원가입</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
