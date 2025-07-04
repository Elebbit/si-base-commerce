import { useState } from 'react'
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription } from '@/components/ui/alert-dialog'

interface Review {
  id: string
  user: string
  rating: number
  content: string
  date: string
  images?: string[]
}

const initialReviews: Review[] = [
  {
    id: '1',
    user: 'John Doe',
    rating: 5,
    content: '엄청 좋아요! 강력 추천합니다.',
    date: '2025-07-04',
    images: ['/placeholder-product.svg']
  },
  {
    id: '2',
    user: 'Jane Doe',
    rating: 4,
    content: '괜찮은 제품이에요.',
    date: '2025-07-02'
  }
]

export function ReviewSection() {
  const [reviews, setReviews] = useState(initialReviews)
  const [newReview, setNewReview] = useState({ user: '', rating: 0, content: '', images: [] as string[] })
  const [showDialog, setShowDialog] = useState(false)

  function handleSubmit() {
    if (newReview.user && newReview.rating && newReview.content) {
      setReviews([...reviews, { ...newReview, id: String(reviews.length + 1), date: new Date().toISOString().split('T')[0] }])
      setNewReview({ user: '', rating: 0, content: '', images: [] })
    }
    setShowDialog(false)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">고객 리뷰</h3>
      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review.id}>
            <CardContent className="flex gap-4 p-6">
              <Avatar className="w-12 h-12">
                <AvatarImage src="/placeholder-avatar.jpg" alt={review.user} />
                <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{review.user}</h4>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="mt-2">{review.content}</p>
                {review.images && (
                  <div className="mt-4 flex gap-2">
                    {review.images.map((image, index) => (
                      <img key={index} src={image} alt={`Review image ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger>
          <Button variant="outline">리뷰 작성하기</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>리뷰 작성</DialogTitle>
          <DialogDescription>
            별점과 내용을 입력해주세요.
          </DialogDescription>
          <div className="mt-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="이름"
              className="border rounded px-3 py-2"
              value={newReview.user}
              onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            />
            <div className="flex items-center gap-2">
              <span>별점:</span>
              {[1, 2, 3, 4, 5].map(rating => (
                <button type="button" key={rating} onClick={() => setNewReview({ ...newReview, rating })}>
                  <Star className={`h-6 w-6 ${newReview.rating >= rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
            <Textarea
              rows={4}
              placeholder="리뷰 내용"
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="secondary" onClick={handleSubmit}>제출하기</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>리뷰 제출 완료</AlertDialogTitle>
                <AlertDialogDescription>리뷰가 성공적으로 제출되었습니다.</AlertDialogDescription>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
