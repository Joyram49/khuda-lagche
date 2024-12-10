import { HandPlatter, MapPinHouse, Truck, Utensils } from "lucide-react";
import OrderSteps from "./order-steps";

function HowToOrder() {
  return (
    <section className='h-auto  3xl:min-h-[calc(70vh-112px)]  bg-backgroundF '>
      <div className='container h-full'>
        <div className='h-full flex-col  flex justify-around items-center gap-y-10 lg:gap-y-0 py-10 md:py-20'>
          {/* how-to-order header */}
          <div className='flex justify-center items-center flex-col'>
            <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-foreground '>
              How to order
            </h1>
            <p className='text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2 '>
              Follow the steps
            </p>
          </div>

          {/* how-to-order steps */}
          <div className='w-full mt-6 md:mt-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-3 lg:gap-x-10 gap-y-20'>
              <OrderSteps
                Icon={MapPinHouse}
                text='Choose your location'
                step='1'
              />
              <OrderSteps Icon={Utensils} text='Choose Restaurant' step='2' />
              <OrderSteps Icon={HandPlatter} text='Make your order' step='3' />
              <OrderSteps Icon={Truck} text='Food is on the way' step='4' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToOrder;
