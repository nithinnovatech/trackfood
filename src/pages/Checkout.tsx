import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, MapPin, CreditCard, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import { useToast } from '@/hooks/use-toast';
import { simulatePayment } from '@/lib/razorpay';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const addressSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
    street: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'ZIP code is required'),
    notes: z.string().optional(),
});

type AddressForm = z.infer<typeof addressSchema>;

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, getTotalPrice, clearCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { createOrder } = useOrders();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentProgress, setPaymentProgress] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddressForm>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
        },
    });

    const totalPrice = getTotalPrice();
    const deliveryFee = totalPrice > 50 ? 0 : 5.99;
    const tax = totalPrice * 0.0825; // 8.25% tax
    const grandTotal = totalPrice + deliveryFee + tax;

    // Redirect if cart is empty
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-24 pb-16 px-4">
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
                        <p className="text-muted-foreground mb-6">
                            Add some delicious items to your cart before checkout.
                        </p>
                        <Link to="/#menu">
                            <Button className="bg-primary hover:bg-primary/90">
                                Browse Menu
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background">
                <Header />
                <main className="pt-24 pb-16 px-4">
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Please login to continue</h1>
                        <p className="text-muted-foreground mb-6">
                            You need to be logged in to place an order.
                        </p>
                        <Link to="/login">
                            <Button className="bg-primary hover:bg-primary/90">
                                Login to Continue
                            </Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const onSubmit = async (data: AddressForm) => {
        setIsProcessing(true);

        try {
            // Simulate payment process
            await simulatePayment(
                grandTotal,
                (paymentId) => {
                    // Create order
                    const order = createOrder(
                        cartItems.map(item => ({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            image: item.image,
                        })),
                        grandTotal,
                        {
                            id: `addr_${Date.now()}`,
                            name: data.name,
                            phone: data.phone,
                            street: data.street,
                            city: data.city,
                            state: data.state,
                            zipCode: data.zipCode,
                        },
                        paymentId,
                        data.notes
                    );

                    // Clear cart
                    clearCart();

                    // Show success message
                    toast({
                        title: 'Order placed successfully!',
                        description: `Your order ${order.id} has been confirmed.`,
                    });

                    // Navigate to success page
                    navigate(`/payment-success?orderId=${order.id}`);
                },
                (message) => setPaymentProgress(message)
            );
        } catch (error) {
            toast({
                title: 'Payment failed',
                description: 'Something went wrong. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsProcessing(false);
            setPaymentProgress('');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-24 pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Home
                    </Link>

                    <h1 className="text-3xl font-bold mb-8">Checkout</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Forms */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Delivery Address */}
                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5" />
                                            Delivery Address
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input id="name" {...register('name')} />
                                                {errors.name && (
                                                    <p className="text-sm text-destructive">{errors.name.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input id="phone" {...register('phone')} />
                                                {errors.phone && (
                                                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="street">Street Address</Label>
                                            <Input id="street" placeholder="123 Main St, Apt 4" {...register('street')} />
                                            {errors.street && (
                                                <p className="text-sm text-destructive">{errors.street.message}</p>
                                            )}
                                        </div>

                                        <div className="grid sm:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input id="city" {...register('city')} />
                                                {errors.city && (
                                                    <p className="text-sm text-destructive">{errors.city.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State</Label>
                                                <Input id="state" {...register('state')} />
                                                {errors.state && (
                                                    <p className="text-sm text-destructive">{errors.state.message}</p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="zipCode">ZIP Code</Label>
                                                <Input id="zipCode" {...register('zipCode')} />
                                                {errors.zipCode && (
                                                    <p className="text-sm text-destructive">{errors.zipCode.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="notes">Order Notes (Optional)</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Special instructions for your order..."
                                                {...register('notes')}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Order Items */}
                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ShoppingBag className="h-5 w-5" />
                                            Order Items ({cartItems.length})
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-0 last:pb-0">
                                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold">{item.name}</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-primary">
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div>
                                <Card className="shadow-lg sticky top-24">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CreditCard className="h-5 w-5" />
                                            Order Summary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span>${totalPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Delivery Fee</span>
                                                <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Tax (8.25%)</span>
                                                <span>${tax.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-lg">Total</span>
                                                <span className="font-bold text-lg text-primary">
                                                    ${grandTotal.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>

                                        {totalPrice < 50 && (
                                            <p className="text-xs text-muted-foreground bg-muted p-3 rounded-lg">
                                                💡 Add ${(50 - totalPrice).toFixed(2)} more for FREE delivery!
                                            </p>
                                        )}

                                        <Button
                                            type="submit"
                                            className="w-full h-14 text-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold"
                                            disabled={isProcessing}
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                    {paymentProgress || 'Processing...'}
                                                </>
                                            ) : (
                                                <>
                                                    <CreditCard className="mr-2 h-5 w-5" />
                                                    Pay ${grandTotal.toFixed(2)}
                                                </>
                                            )}
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground">
                                            🔒 Your payment is secure and encrypted
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Checkout;
