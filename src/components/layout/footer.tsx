import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-xl font-bold mb-4">SI Commerce</h3>
            <p className="text-gray-300 mb-4">
              최고의 상품을 최저가로 제공하는 대한민국 대표 온라인 쇼핑몰입니다.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* 고객 서비스 */}
          <div>
            <h4 className="font-semibold mb-4">고객 서비스</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/help" className="hover:text-white">고객센터</Link></li>
              <li><Link href="/faq" className="hover:text-white">자주 묻는 질문</Link></li>
              <li><Link href="/shipping" className="hover:text-white">배송 안내</Link></li>
              <li><Link href="/returns" className="hover:text-white">교환/반품</Link></li>
              <li><Link href="/size-guide" className="hover:text-white">사이즈 가이드</Link></li>
            </ul>
          </div>

          {/* 정책 */}
          <div>
            <h4 className="font-semibold mb-4">정책</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/terms" className="hover:text-white">이용약관</Link></li>
              <li><Link href="/privacy" className="hover:text-white">개인정보처리방침</Link></li>
              <li><Link href="/youth" className="hover:text-white">청소년 보호정책</Link></li>
              <li><Link href="/electronic-commerce" className="hover:text-white">전자상거래 소비자 보호법</Link></li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="font-semibold mb-4">연락처</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>1588-0000</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@sicommerce.co.kr</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>서울특별시 강남구 테헤란로 123, SI타워 10층</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">평일 09:00-18:00</p>
              <p className="text-sm text-gray-400">주말/공휴일 휴무</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 lg:mb-0">
              <p>© 2024 SI Commerce. All rights reserved.</p>
              <p>사업자등록번호: 123-45-67890 | 통신판매업신고번호: 제2024-서울강남-0123호</p>
              <p>대표이사: 홍길동 | 주소: 서울특별시 강남구 테헤란로 123, SI타워 10층</p>
            </div>
            <div className="flex space-x-4 text-sm text-gray-400">
              <span>개인정보보호책임자: 김철수</span>
              <span>호스팅 서비스: AWS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
