'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function SignUpPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false,
    agreePrivacy: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    
    if (!formData.agreeTerms || !formData.agreePrivacy) {
      alert('약관에 동의해주세요.')
      return
    }

    // 임시 회원가입 처리
    alert('회원가입이 완료되었습니다!')
    router.push('/auth/signin')
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">회원가입</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">이름</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="홍길동"
                />
              </div>
              
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
                <label className="block text-sm font-medium mb-1">휴대폰 번호</label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="010-1234-5678"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">비밀번호</label>
                <Input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="8자 이상 입력하세요"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">비밀번호 확인</label>
                <Input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                    className="mt-1"
                  />
                  <span className="text-sm">
                    <Link href="/terms" className="text-blue-600 hover:underline">이용약관</Link>에 동의합니다. (필수)
                  </span>
                </label>
                
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData({...formData, agreePrivacy: e.target.checked})}
                    className="mt-1"
                  />
                  <span className="text-sm">
                    <Link href="/privacy" className="text-blue-600 hover:underline">개인정보 처리방침</Link>에 동의합니다. (필수)
                  </span>
                </label>
              </div>

              <Button type="submit" className="w-full">
                회원가입
              </Button>
            </form>

            <div className="text-center text-sm">
              이미 계정이 있으신가요?{' '}
              <Link href="/auth/signin" className="text-blue-600 hover:underline">
                로그인
              </Link>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                구글로 가입
              </Button>
              <Button variant="outline" className="w-full">
                카카오로 가입
              </Button>
              <Button variant="outline" className="w-full">
                네이버로 가입
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
