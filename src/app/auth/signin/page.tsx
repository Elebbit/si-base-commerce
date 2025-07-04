'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 임시 로그인 처리
    if (formData.email && formData.password) {
      alert('로그인 되었습니다!')
      router.push('/')
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">로그인</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">이메일</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">비밀번호</label>
                <Input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </form>

            <div className="flex items-center justify-between text-sm">
              <Link href="/auth/forgot-password" className="text-blue-600 hover:underline">
                비밀번호 찾기
              </Link>
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                회원가입
              </Link>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                구글로 로그인
              </Button>
              <Button variant="outline" className="w-full">
                카카오로 로그인
              </Button>
              <Button variant="outline" className="w-full">
                네이버로 로그인
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
