import React from 'react'
import Subtitle from '../discover/Subtitle';
import Badge from './Badge';
import { capitalizeWords, convertOpeningHours } from '@/lib/utils';
import DetailsTable from './DetailsTable';
import SocialMediaLink from './SocialMediaLink';
import Map from './Map';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Details({ itemDetails }: { itemDetails: PlaceDetails }) {
  const {
    // fsq_id, 
    description, tips, // Overview
    hours, hours_popular, // Opening hours
    features, // Services & Payments
    location, tel, email, website, social_media, geocodes, // Basic information
    // photos, // more photos
    price, popularity, // indicators
  } = itemDetails;

  const showCreditCards = features.payment?.credit_cards?.accepts_credit_cards || false;
  const showDigitalWallet = features.payment?.digital_wallet?.accepts_nfc || false;
  const showServices = features.services || false;
  const showDineIn = features.services?.dine_in || false;
  const showFoodNDrink = features.food_and_drink || false;
  const showAlcohol = features.food_and_drink?.alcohol || false;
  const showMeals = features.food_and_drink?.meals || false;
  const isOpening = hours.open_now ? 'Opening Now' : 'Not Opening Now';
  const isLocalHoliday = hours.is_local_holiday ? 'Local Holiday' : '';
  const formattedHours = convertOpeningHours(hours.regular);

  return (
    <div className='content-details'>
      {
        description &&
        <div className='content-details-section'>
          <Subtitle title={'Overview'} />
          <p className='max-2xl:text-sm w-fit'>
            {description}
          </p>
          {/* {
            tips &&
            tips.map((tip: Tip, index) => (
              <Badge key={index} text={tip.text} />
            ))
          } */}

          {
            showCreditCards &&
            <div className='flex gap-2 flex-wrap'>
              <Badge text='Payments:' lead={true} />
              {
                Object.entries(features.payment.credit_cards).map(([card, value], index) => {
                  if (value) {
                    return <Badge key={index} text={capitalizeWords(card.replaceAll('_', ' '))} />;
                  }
                })
              }
              {
                showDigitalWallet &&
                <Badge text='Accepts NFC' />
              }
            </div>
          }

          {
            showServices &&
            <div className='flex gap-2 flex-wrap'>
              <Badge text='Services:' lead={true} />
              {
                Object.entries(features.services).map(([service, value], index) => {
                  if (service !== 'dine_in' && value) {
                    return <Badge key={index} text={capitalizeWords(service.replaceAll('_', ' '))} />
                  }
                })
              }
              {
                showDineIn &&
                Object.entries(features.services.dine_in).map(([reserve, value], index) => {
                  if (value) {
                    return <Badge key={index} text={capitalizeWords(reserve.replaceAll('_', ' '))} />
                  }
                })
              }
            </div>
          }

          {
            showFoodNDrink &&
            <div className='flex gap-2 flex-wrap'>
              <Badge text='Food & Drink:' lead={true} />
              {
                showAlcohol &&
                Object.entries(features.food_and_drink.alcohol).map(([drink, value], index) => {
                  if (value) {
                    return <Badge key={index} text={capitalizeWords(drink.replaceAll('_', ' '))} />
                  }
                })
              }
              {
                showMeals &&
                Object.entries(features.food_and_drink.meals).map(([food, value], index) => {
                  if (value) {
                    return <Badge key={index} text={capitalizeWords(food.replaceAll('_', ' '))} />
                  }
                })
              }
            </div>
          }
        </div>
      }

      <div className='content-details-section'>
        <Subtitle title={'Opening Hours'} />
        <div className='flex flex-col gap-5'>
          <p className='max-2xl:text-sm font-semibold'>{isOpening + ' ∙ '}
            { hours.is_local_holiday && <span className='font-normal'>{isLocalHoliday + ' ∙ '}</span> }
            <span className='font-normal'>{hours.display.toLowerCase()}</span>
          </p>
          <div className='flex flex-col'>
            {
              formattedHours.map((formattedHour, index) => (
                <DetailsTable key={index} label={formattedHour.weekday} data={formattedHour.hours} />
              ))
            }
          </div>
        </div>
      </div>

      <div className='content-details-section'>
        <Subtitle title={'Basic Information'} />
        <div className='flex flex-col'>
          { website && <DetailsTable label='Website' data={website} /> }
          { location && <DetailsTable label="Address" data={location.formatted_address} /> }
          { tel && <DetailsTable label='Phone' data={tel} /> }
          { email && <DetailsTable label='Email' data={email} /> }
        </div>
        {
          social_media &&
          <div className='flex gap-2 flex-wrap items-center'>
            <p className='max-2xl:text-sm mr-3'>Social Media</p>
            {
              Object.entries(social_media).map(([type, name], index) => (
                <SocialMediaLink key={index} type={type} name={name} />
              ))
            }
          </div>
        }
        <Map latitude={geocodes.main.latitude} longitude={geocodes.main.longitude}/>
        <Link href={`https://www.google.com/maps/search/?api=1&query=${geocodes.main.latitude},${geocodes.main.longitude}`} target='_blank'>
          <Button className='w-fit bg-customWhite-200'>Open In Google Map</Button>
        </Link>
      </div>
    </div>
  )
}
