"use client";
import { Button } from "@/components/ui/button"
import Stripe  from "stripe"


export default async function index() {

    const handleCheckOut = async (priceId: string) => {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({priceId: priceId}),
        });
        const session = await response.json();
        
    }
  return (
    <div>
        <h1>Pick Your Amount to Recharge</h1>
        <div className="flex items-center justify-center p-5">
           <Button onClick={()=>handleCheckOut("prod_O0ZDnCGR9dhu6w")}>$5</Button>
        </div>
    </div>
  )
}
