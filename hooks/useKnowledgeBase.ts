// "use client";

// import { useState } from "react";
// import { Article, ArticleCategory } from "@/types/knowledge";
// import { Flame, Waves, BookOpen, Heart, Shield, Radio } from "lucide-react";

// const mockCategories: ArticleCategory[] = [
//   {
//     id: "fire",
//     name: "Fire Safety",
//     icon: <Flame className="h-3.5 w-3.5" />,
//   },
//   {
//     id: "flood",
//     name: "Flood",
//     icon: <Waves className="h-3.5 w-3.5" />,
//   },
//   {
//     id: "earthquake",
//     name: "Earthquake",
//     icon: <Shield className="h-3.5 w-3.5" />,
//   },
//   {
//     id: "firstaid",
//     name: "First Aid",
//     icon: <Heart className="h-3.5 w-3.5" />,
//   },
//   {
//     id: "communication",
//     name: "Communication",
//     icon: <Radio className="h-3.5 w-3.5" />,
//   },
// ];

// const mockArticles: Article[] = [
//   {
//     id: "1",
//     categoryId: "fire",
//     title: "Fire Safety at Home",
//     slug: "fire-safety-at-home",
//     summary: "Essential tips for preventing and responding to fires in your home.",
//     content: "# Fire Safety at Home\n\nFires can start and spread quickly, potentially causing extensive damage, injuries, or even death. However, by following some basic safety measures, you can significantly reduce the risk of fires in your home.\n\n## Prevention\n\n- Install smoke alarms on every level of your home.\n- Test your smoke alarms monthly and replace batteries at least once a year.\n- Keep anything that can catch fire away from stovetops.\n- Never leave cooking unattended.\n- Keep portable heaters at least 3 feet from anything that can burn.\n\n## In Case of Fire\n\n1. **Get Out and Stay Out**: Evacuate immediately if you detect a fire. Do not re-enter the building for any reason.\n2. **Call Emergency Services**: Once safely outside, call 911 or your local emergency number.\n3. **Stop, Drop, and Roll**: If your clothes catch fire, stop, drop to the ground, and roll to smother the flames.\n4. **Use a Fire Extinguisher**: Only if the fire is small and contained, and you have an escape route available.",
//     imageUrl: "https://images.pexels.com/photos/6490322/pexels-photo-6490322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     createdAt: "2023-05-15T10:30:00Z",
//     updatedAt: "2023-06-20T14:45:00Z",
//   },
//   {
//     id: "2",
//     categoryId: "flood",
//     title: "Flood Preparedness and Response",
//     slug: "flood-preparedness-response",
//     summary: "How to prepare for, survive during, and recover after a flood event.",
//     content: "# Flood Preparedness and Response\n\nFloods are among the most common and costly natural disasters. Being prepared can help minimize damage and save lives.\n\n## Before a Flood\n\n- Know your area's flood risk.\n- Prepare an emergency kit with water, non-perishable food, medications, and important documents.\n- Create an evacuation plan for your household.\n- Consider flood insurance for your property.\n\n## During a Flood\n\n1. **Stay Informed**: Listen to local alerts and warnings.\n2. **Evacuate if Told**: Follow evacuation orders immediately.\n3. **Avoid Floodwaters**: Just 6 inches of moving water can knock you down, and 2 feet can sweep your vehicle away.\n4. **Move to Higher Ground**: If you're trapped by floodwater, move to the highest level of the building.\n\n## After a Flood\n\n- Return home only when authorities say it's safe.\n- Be aware of road hazards like washed-out roads or collapsed bridges.\n- Avoid standing water, which may be electrically charged or contaminated.\n- Document damage to your property for insurance claims.",
//     imageUrl: "https://images.pexels.com/photos/760984/pexels-photo-760984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     createdAt: "2023-04-10T09:15:00Z",
//     updatedAt: "2023-05-25T11:20:00Z",
//   },
//   {
//     id: "3",
//     categoryId: "earthquake",
//     title: "Earthquake Safety Procedures",
//     slug: "earthquake-safety-procedures",
//     summary: "Actions to take before, during, and after an earthquake to ensure safety.",
//     content: "# Earthquake Safety Procedures\n\nEarthquakes can occur suddenly with little to no warning. Knowing what to do can help keep you and your loved ones safe.\n\n## Before an Earthquake\n\n- Secure heavy furniture and objects that could fall.\n- Create an emergency plan and identify safe spots in each room.\n- Assemble an emergency kit with essentials.\n- Know how to shut off utilities like gas and water.\n\n## During an Earthquake\n\n1. **Drop, Cover, and Hold On**: Drop to your hands and knees, take cover under a sturdy desk or table, and hold on until the shaking stops.\n2. **Stay Indoors**: If you're inside, stay there. Most injuries occur when people try to move to different locations or run outside.\n3. **If Outside**: Move to an open area away from buildings, trees, streetlights, and utility wires.\n4. **If Driving**: Pull over to a clear location, stop, and stay in your car with seatbelt fastened.\n\n## After an Earthquake\n\n- Check yourself and others for injuries.\n- Be prepared for aftershocks.\n- Use the phone only for emergencies.\n- If you smell gas, evacuate immediately and notify authorities.",
//     imageUrl: "https://images.pexels.com/photos/3377666/pexels-photo-3377666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     createdAt: "2023-03-20T15:45:00Z",
//     updatedAt: "2023-05-18T10:30:00Z",
//   },
//   {
//     id: "4",
//     categoryId: "firstaid",
//     title: "Basic First Aid for Emergencies",
//     slug: "basic-first-aid-emergencies",
//     summary: "Essential first aid techniques everyone should know for common emergency situations.",
//     content: "# Basic First Aid for Emergencies\n\nKnowing basic first aid can help you assist yourself or others in an emergency until professional help arrives.\n\n## Bleeding\n\n1. **Apply Direct Pressure**: Use a clean cloth or bandage and apply firm pressure to the wound.\n2. **Elevate the Injured Area**: If possible, raise the wound above the level of the heart.\n3. **Apply a Tourniquet**: Only as a last resort for severe, life-threatening bleeding that cannot be controlled by direct pressure.\n\n## Burns\n\n1. **Cool the Burn**: Run cool (not cold) water over the area for 10-15 minutes.\n2. **Cover with a Clean Cloth**: Use a sterile, non-adhesive bandage or clean cloth.\n3. **Don't Apply Butter or Ointments**: These can trap heat and increase the risk of infection.\n\n## CPR Basics\n\n1. **Check Responsiveness**: Tap the person and shout, \"Are you OK?\"\n2. **Call for Help**: Have someone call emergency services immediately.\n3. **Begin Chest Compressions**: Push hard and fast in the center of the chest, about 2 inches deep at a rate of 100-120 compressions per minute.\n4. **Continue Until Help Arrives**: Do not stop CPR unless the person shows signs of life or professional help takes over.\n\n## Choking\n\n1. **Encourage Coughing**: If the person can speak or cough, encourage them to keep coughing.\n2. **Perform Abdominal Thrusts (Heimlich Maneuver)**: Stand behind the person, wrap your arms around their waist, and thrust inward and upward above their navel.\n3. **Repeat Until Object is Expelled**: Continue thrusts until the object is forced out or the person becomes unconscious (then begin CPR).",
//     imageUrl: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     createdAt: "2023-02-05T11:00:00Z",
//     updatedAt: "2023-04-10T09:30:00Z",
//   },
//   {
//     id: "5",
//     categoryId: "communication",
//     title: "Emergency Communication Planning",
//     slug: "emergency-communication-planning",
//     summary: "How to establish reliable communication methods during disasters when normal channels may be disrupted.",
//     content: "# Emergency Communication Planning\n\nDuring disasters, normal communication channels like cell phones may be unavailable or overloaded. Having a communication plan is essential for staying in touch with loved ones.\n\n## Create a Communication Plan\n\n1. **Establish a Meeting Place**: Designate a physical location where family members should gather in case of separation.\n2. **Choose an Out-of-Area Contact**: This person can serve as a central point of contact when local calls may not go through.\n3. **Document Important Numbers**: Write down emergency contacts, as your phone may not be available.\n4. **Consider Alternative Methods**: Have backup communication methods like two-way radios or satellite phones.\n\n## During an Emergency\n\n1. **Text Instead of Call**: Text messages require less bandwidth and are more likely to go through during network congestion.\n2. **Be Brief**: Keep calls short to allow others to use limited network resources.\n3. **Use Social Media**: Many platforms have safety check features during major disasters.\n4. **Check in Regularly**: Let your emergency contacts know you're safe.\n\n## Alternative Communication Methods\n\n- **Two-Way Radios (Walkie-Talkies)**: Effective for short-range communication when cell networks are down.\n- **CB Radios**: Can be useful for communicating with emergency responders or others nearby.\n- **Satellite Phones**: Work when cell towers are damaged but require a clear view of the sky.\n- **Amateur (Ham) Radio**: Requires a license but can be valuable during major disasters.\n\nRemember to keep batteries charged and have backup power sources for all communication devices.",
//     imageUrl: "https://images.pexels.com/photos/3811047/pexels-photo-3811047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     createdAt: "2023-01-15T13:20:00Z",
//     updatedAt: "2023-03-28T16:45:00Z",
//   },
//   {
//     id: "6",
//     categoryId: "fire",
//     title: "Wildfire Safety and Evacuation",
//     slug: "wildfire-safety-evacuation",
//     summary: "Guidelines for preparing for wildfires and evacuating safely if threatened.",
//     content: "# Wildfire Safety and Evacuation\n\nWildfires can spread rapidly, threatening homes and communities with little warning. Being prepared can help protect your family and property.\n\n## Preparing Your Home\n\n- **Create Defensible Space**: Clear vegetation and flammable materials around your home.\n- **Use Fire-Resistant Materials**: Consider fire-resistant roofing, siding, and windows.\n- **Have Garden Hoses Ready**: Ensure they're long enough to reach all areas of your property.\n- **Review Insurance Coverage**: Ensure your policy covers wildfire damage.\n\n## Evacuation Preparation\n\n1. **Create an Evacuation Plan**: Map out multiple evacuation routes from your neighborhood.\n2. **Prepare an Emergency Kit**: Include water, food, medications, important documents, and personal items.\n3. **Have a Communication Plan**: Establish how family members will contact each other if separated.\n4. **Plan for Pets and Livestock**: Arrange transportation and shelter options for animals.\n\n## During a Wildfire Threat\n\n1. **Stay Informed**: Monitor news, social media, and emergency alerts for updates.\n2. **Evacuate Early**: Don't wait until the last minute to leave if evacuation is recommended.\n3. **Dress Appropriately**: Wear long sleeves, long pants, closed-toe shoes, and a bandana to filter smoke.\n4. **Close Windows and Doors**: Shut off gas at the meter and turn off air conditioning.\n\n## If Trapped\n\n- **Stay Calm**: Panic can lead to poor decisions.\n- **Call 911**: Inform authorities of your location.\n- **Shelter in Place**: Stay in a structure if possible, away from exterior walls.\n- **Find an Area Clear of Vegetation**: If outside, find an area with little or no flammable material.\n\nRemember: Your life is more important than your property. Evacuate when advised by authorities.",
//     imageUrl: "https://images.pexels.com/photos/51951/forest-fire-fire-smoke-conservation-51951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     createdAt: "2022-12-18T10:30:00Z",
//     updatedAt: "2023-02-22T14:15:00Z",
//   },
// ];

// export function useKnowledgeBase() {
//   const [articles] = useState<Article[]>(mockArticles);
//   const [categories] = useState<ArticleCategory[]>(mockCategories);

//   return {
//     articles,
//     categories,
//   };
// }