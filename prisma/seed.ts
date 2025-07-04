import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 시드 데이터 시작...')

  // 카테고리 생성
  const electronicsCategory = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: '전자제품',
      description: '최신 전자제품과 디지털 기기를 만나보세요.',
      slug: 'electronics',
      image: '/category-electronics.jpg',
      isActive: true,
    },
  })

  const fashionCategory = await prisma.category.upsert({
    where: { slug: 'fashion' },
    update: {},
    create: {
      name: '패션',
      description: '트렌디한 의류와 악세서리를 둘러보세요.',
      slug: 'fashion',
      image: '/category-fashion.jpg',
      isActive: true,
    },
  })

  const homeCategory = await prisma.category.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      name: '홈 & 리빙',
      description: '집을 더욱 아름답게 만들어줄 홈 인테리어 제품들.',
      slug: 'home',
      image: '/category-home.jpg',
      isActive: true,
    },
  })

  const booksCategory = await prisma.category.upsert({
    where: { slug: 'books' },
    update: {},
    create: {
      name: '도서',
      description: '다양한 장르의 도서를 만나보세요.',
      slug: 'books',
      image: '/category-books.jpg',
      isActive: true,
    },
  })

  // 상품 생성
  const iphone = await prisma.product.upsert({
    where: { id: '1001234567890' },
    update: {},
    create: {
      id: '1001234567890',
      name: 'iPhone 15 Pro Max',
      description: 'Apple의 최신 플래그십 스마트폰으로, 강력한 A17 Pro 칩셋과 Pro 카메라 시스템을 탑재했습니다.',
      slug: 'iphone-15-pro-max',
      sku: 'IPHONE15PROMAX',
      price: 1590000,
      salePrice: 1490000,
      stock: 10,
      status: 'ACTIVE',
      images: ['/placeholder-product.svg'],
      weight: 0.221,
      dimensions: '159.9 x 76.7 x 8.25 mm',
      isDigital: false,
      categoryId: electronicsCategory.id,
    },
  })

  const macbook = await prisma.product.upsert({
    where: { id: '1001234567891' },
    update: {},
    create: {
      id: '1001234567891',
      name: 'MacBook Pro 14인치',
      description: 'M3 Pro 칩을 탑재한 MacBook Pro로 전문가급 성능을 경험하세요.',
      slug: 'macbook-pro-14',
      sku: 'MACBOOKPRO14',
      price: 2690000,
      stock: 5,
      status: 'ACTIVE',
      images: ['/placeholder-product.svg'],
      weight: 1.6,
      dimensions: '312.6 x 221.2 x 15.5 mm',
      isDigital: false,
      categoryId: electronicsCategory.id,
    },
  })

  const airpods = await prisma.product.upsert({
    where: { id: '1001234567892' },
    update: {},
    create: {
      id: '1001234567892',
      name: 'AirPods Pro 2세대',
      description: '업그레이드된 H2 칩으로 더욱 뛰어난 액티브 노이즈 캔슬링을 경험하세요.',
      slug: 'airpods-pro-2',
      sku: 'AIRPODSPRO2',
      price: 359000,
      salePrice: 299000,
      stock: 0,
      status: 'OUT_OF_STOCK',
      images: ['/placeholder-product.svg'],
      weight: 0.056,
      dimensions: '30.9 x 21.8 x 24.0 mm',
      isDigital: false,
      categoryId: electronicsCategory.id,
    },
  })

  const ipad = await prisma.product.upsert({
    where: { id: '1001234567893' },
    update: {},
    create: {
      id: '1001234567893',
      name: 'iPad Air 5세대',
      description: 'M1 칩을 탑재한 iPad Air로 강력한 성능과 휴대성을 모두 만족하세요.',
      slug: 'ipad-air-5',
      sku: 'IPADAIR5',
      price: 929000,
      stock: 15,
      status: 'ACTIVE',
      images: ['/placeholder-product.svg'],
      weight: 0.461,
      dimensions: '247.6 x 178.5 x 6.1 mm',
      isDigital: false,
      categoryId: electronicsCategory.id,
    },
  })

  const appleWatch = await prisma.product.upsert({
    where: { id: '1001234567894' },
    update: {},
    create: {
      id: '1001234567894',
      name: 'Apple Watch Series 9',
      description: 'S9 칩을 탑재한 Apple Watch로 건강과 피트니스를 관리하세요.',
      slug: 'apple-watch-series-9',
      sku: 'APPLEWATCH9',
      price: 599000,
      salePrice: 549000,
      stock: 8,
      status: 'ACTIVE',
      images: ['/placeholder-product.svg'],
      weight: 0.042,
      dimensions: '45 x 38 x 10.7 mm',
      isDigital: false,
      categoryId: electronicsCategory.id,
    },
  })

  const macbookAir = await prisma.product.upsert({
    where: { id: '1001234567895' },
    update: {},
    create: {
      id: '1001234567895',
      name: 'MacBook Air M3',
      description: 'M3 칩을 탑재한 MacBook Air로 일상과 업무를 더욱 효율적으로.',
      slug: 'macbook-air-m3',
      sku: 'MACBOOKAIRM3',
      price: 1590000,
      stock: 12,
      status: 'ACTIVE',
      images: ['/placeholder-product.svg'],
      weight: 1.24,
      dimensions: '304.1 x 215 x 11.3 mm',
      isDigital: false,
      categoryId: electronicsCategory.id,
    },
  })

  // 사용자 생성
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sicommerce.co.kr' },
    update: {},
    create: {
      name: '관리자',
      email: 'admin@sicommerce.co.kr',
      role: 'ADMIN',
      phone: '010-1234-5678',
    },
  })

  const testUser = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      name: '홍길동',
      email: 'user@test.com',
      role: 'USER',
      phone: '010-9876-5432',
    },
  })

  // 리뷰 생성
  await prisma.review.upsert({
    where: { 
      userId_productId: {
        userId: testUser.id,
        productId: iphone.id
      }
    },
    update: {},
    create: {
      userId: testUser.id,
      productId: iphone.id,
      rating: 5,
      title: '정말 만족스러운 구매!',
      content: '카메라 성능이 정말 뛰어나고 배터리도 오래갑니다. 강력 추천합니다!',
      images: ['/placeholder-product.svg'],
      isVerified: true,
    },
  })

  await prisma.review.upsert({
    where: { 
      userId_productId: {
        userId: adminUser.id,
        productId: macbook.id
      }
    },
    update: {},
    create: {
      userId: adminUser.id,
      productId: macbook.id,
      rating: 4,
      title: '성능은 좋지만...',
      content: '성능은 정말 좋지만 가격이 조금 비싸네요. 그래도 개발용으로는 최고입니다.',
      isVerified: true,
    },
  })

  // 주문 생성
  const order1 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2025070400001',
      userId: testUser.id,
      status: 'PENDING',
      totalAmount: 1490000,
      shippingAmount: 0,
      taxAmount: 0,
      discountAmount: 100000,
      paymentStatus: 'PENDING',
      paymentMethod: 'card',
      shippingAddress: {
        firstName: '홍',
        lastName: '길동',
        address1: '서울특별시 강남구 테헤란로 123',
        city: '서울',
        state: '강남구',
        postalCode: '12345',
        country: 'KR',
        phone: '010-9876-5432'
      },
      notes: '문 앞에 놓아주세요',
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: iphone.id,
      quantity: 1,
      price: 1490000,
      total: 1490000,
    },
  })

  const order2 = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2025070300001',
      userId: adminUser.id,
      status: 'SHIPPED',
      totalAmount: 2690000,
      shippingAmount: 0,
      taxAmount: 0,
      discountAmount: 0,
      paymentStatus: 'COMPLETED',
      paymentMethod: 'bank',
      shippingAddress: {
        firstName: '관리자',
        lastName: '',
        address1: '서울특별시 강남구 테헤란로 456',
        city: '서울',
        state: '강남구',
        postalCode: '54321',
        country: 'KR',
        phone: '010-1234-5678'
      },
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: macbook.id,
      quantity: 1,
      price: 2690000,
      total: 2690000,
    },
  })

  // 장바구니 아이템 생성
  await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId: testUser.id,
        productId: ipad.id
      }
    },
    update: {},
    create: {
      userId: testUser.id,
      productId: ipad.id,
      quantity: 1,
    },
  })

  await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId: testUser.id,
        productId: appleWatch.id
      }
    },
    update: {},
    create: {
      userId: testUser.id,
      productId: appleWatch.id,
      quantity: 2,
    },
  })

  console.log('✅ 시드 데이터 완료!')
  console.log(`📊 카테고리: 4개`)
  console.log(`📦 상품: 6개`)
  console.log(`👥 사용자: 2개`)
  console.log(`⭐ 리뷰: 2개`)
  console.log(`📋 주문: 2개`)
  console.log(`🛒 장바구니: 2개`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
