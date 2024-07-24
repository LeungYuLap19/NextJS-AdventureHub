import React from 'react'
import Subtitle from '../discover/Subtitle';
import Badge from './Badge';
import { capitalizeWords, convertOpeningHours } from '@/lib/utils';
import DetailsTable from './DetailsTable';
import SocialMediaLink from './SocialMediaLink';
import Map from './Map';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Details({ itemDetails, extraData }: { itemDetails: PlaceDetails, extraData: ExtraData | null}) {
  const {
    // fsq_id, 
    description, tips, // Overview
    hours, hours_popular, // Opening hours
    features, // Services & Payments
    location, tel, email, website, social_media, geocodes, // Basic information
    // photos, // more photos
    price, popularity, // indicators
  } = itemDetails;

  const isOpening = hours.open_now ? 'Opening Now' : 'Not Opening Now';
  const isLocalHoliday = hours.is_local_holiday ? 'Local Holiday' : '';
  const formattedHours = hours.regular ? convertOpeningHours(hours.regular) : null;
  const hasOverviewContent = description || features?.payment?.credit_cards || features?.payment?.digital_wallet?.accepts_nfc || features?.services || features?.food_and_drink;
  
  const paymentBadges = features?.payment?.credit_cards
  ? Object.entries(features.payment.credit_cards).map(([card, value], index) => value && <Badge key={index} text={capitalizeWords(card.replaceAll('_', ' '))} />).filter(Boolean)
  : [];

  const serviceBadges = features?.services
    ? Object.entries(features.services).map(([service, value], index) => service !== 'dine_in' && value && <Badge key={index} text={capitalizeWords(service.replaceAll('_', ' '))} />).filter(Boolean)
    : [];

  const dineInBadges = features?.services?.dine_in
    ? Object.entries(features.services.dine_in).map(([reserve, value], index) => value && <Badge key={index} text={capitalizeWords(reserve.replaceAll('_', ' '))} />).filter(Boolean)
    : [];

  const drinkBadges = features?.food_and_drink?.alcohol
    ? Object.entries(features.food_and_drink.alcohol).map(([drink, value], index) => value && <Badge key={index} text={capitalizeWords(drink.replaceAll('_', ' '))} />).filter(Boolean)
    : [];
  
  const foodBadges = features?.food_and_drink?.meals
    ? Object.entries(features.food_and_drink.meals).map(([food, value], index) => value && <Badge key={index} text={capitalizeWords(food.replaceAll('_', ' '))} />).filter(Boolean)
    : [];

  const socialMediaLinks = social_media
    ? Object.entries(social_media).map(([type, name], index) => name && <SocialMediaLink key={index} type={type} name={name} />).filter(Boolean)
    : [];

  return (
    <div className='content-details'>
      {hasOverviewContent && (
        <div className='content-details-section'>
          <Subtitle title={'Overview'} />
          {description && <p className='max-2xl:text-sm w-fit'>{description}</p>}

          {paymentBadges.length > 0 && (
            <div className='flex gap-2 flex-wrap'>
              <Badge text='Payments:' lead={true} />
              {paymentBadges}
              {features?.payment?.digital_wallet?.accepts_nfc && <Badge text='Accepts NFC' />}
            </div>
          )}

          {(serviceBadges.length > 0 || dineInBadges.length > 0) && (
            <div className='flex gap-2 flex-wrap'>
              <Badge text='Services:' lead={true} />
              {serviceBadges}
              {dineInBadges}
            </div>
          )}

          {(foodBadges.length > 0 || drinkBadges.length > 0) && (
            <div className='flex gap-2 flex-wrap'>
              <Badge text='Food & Drink:' lead={true} />
              {drinkBadges} 
              {foodBadges}
            </div>
          )}
        </div>
      )}

      {hours && (hours.open_now !== undefined || hours.is_local_holiday !== undefined || hours.display || formattedHours) && (
        <div className='content-details-section'>
          <Subtitle title={'Opening Hours'} />
          <div className='flex flex-col gap-5'>
            {(hours.open_now !== undefined || hours.is_local_holiday !== undefined || hours.display) && (
              <p className='max-2xl:text-sm font-semibold'>
                {hours.open_now !== undefined && `${isOpening}`}
                {hours.is_local_holiday && <span className='font-normal'> ∙ {isLocalHoliday} ∙ </span>}
                {hours.display && <span className='font-normal'> ∙ {hours.display.toLowerCase()}</span>}
              </p>
            )}
            {formattedHours && (
              <div className='flex flex-col'>
                {formattedHours.map((formattedHour, index) => (
                  <DetailsTable key={index} label={formattedHour.weekday} data={formattedHour.hours} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {(location || tel || email || website || social_media || geocodes) && (
        <div className='content-details-section'>
          <Subtitle title={'Basic Information'} />
          <div className='flex flex-col'>
            {website && <DetailsTable label='Website' data={website} />}
            {location?.formatted_address && <DetailsTable label="Address" data={location.formatted_address} />}
            {tel && <DetailsTable label='Phone' data={tel} />}
            {email && <DetailsTable label='Email' data={email} />}
          </div>
          {socialMediaLinks.length > 0 && (
            <div className='flex gap-2 flex-wrap items-center'>
              <p className='max-2xl:text-sm mr-3'>Social Media</p>
              {socialMediaLinks}
            </div>
          )}
          {geocodes?.main && (
            <>
              <Map positions={[{lat: geocodes.main.latitude, lng: geocodes.main.longitude}]} type='place' />
              <Link href={extraData ? extraData.googleMapsUri : `https://www.google.com/maps/search/?api=1&query=${geocodes.main.latitude},${geocodes.main.longitude}`} target='_blank'>
                <Button className='w-fit bg-customWhite-200 cursor-pointer'>Open In Google Map</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
