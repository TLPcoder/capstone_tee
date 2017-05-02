"use strict";
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({
            course_id: 1,
            commenter_id:1,
            rating:5,
            comment:"I played Green Hills today for the first timesince they have made their renovations.  I've got to say, this is easily a 5-star course.  First of all, it is in GREAT shape.  The course is well maintained, and is so very green.  It is an Alister MacKenzie course - and like Pasatiempo - it puts a premium on your short game. The greens are slick and slanted.Many of the holes have multi - tiered greens that are IMPOSSIBLE to put the brakes on while putting downhill.As its name suggests, it is quite hilly.Many of the holes have dramatic uphill or downhill shots.The greens on almost every hole have a false - front or fall - off back.I had several approach shots fall just short, and watched the ball trickle 20 - 30 yards back towards me. I hit the ball very well today, but the greens ate me alive.I shot a 94, didn 't lose a ball - and only had one par.  I had at least 10 three-putts this afternoon.  But I couldn't feel too bad about it - it 's just how Green Hills and that sadistic Alister MacKenzie roll..."
        }),
        knex('comments').insert({
            course_id: 2,
            commenter_id:1,
            rating:3,
            comment: "A little disappointed in the condition of the course after hearing all the hype and overpriced for the experience. We ended up getting yelled at by the marshall because the ladies in front of us said we were hitting into them and causing them to play faster than they wanted, which was a result of them playing bad. We were told they allow 4.5 hours to play yet there was no one in front of them for several holes nor would they allow us to play through. We later learned they were some big wigs.  For a bunch of members who claim they value the school and course, have no manners, golf etiquette nor repair ball marks on the greens. It's a shame because the course has so much to offer."
        }),
        knex('comments').insert({
            course_id: 3,
            commenter_id:1,
            rating:5,
            comment:"Wow!!! best finishing holes i have ever played on !! And scariest , most beautiful and most amazing par three par 3 ever on this course!! The course was a lot easier than i expected. Only draw back is you are required to have a caddy if you play.....but i would definitely love to play another round on it in the future!!"
        }),
        knex('comments').insert({
            course_id: 1,
            commenter_id:2,
            rating:4,
            comment:"Green Hills Country Club was a fantastic experience!!!  All I can say is WOW!!!  Every aspect of the facility is 5 star. The golf course was in tip top shape. The greens are speedy and true. The pro shop was stocked with all you could ask for and if its not in the shop the pros were very helpful in special ordering. The Director Trevor Miller was outreaously funny and very profesional as well as the head pro John. Mike Cornwall the merchandiser has done a great job with clothing, there was a little bit for everyone. Some hip new style clothing as well as the classical golf clothing.."
        }),
        knex('comments').insert({
            course_id: 2,
            commenter_id:2,
            rating:5,
            comment:"I've played here countless times.  When I was a student, there was this Tiger guy that also played here 5 times a week and he was unbelievable.  He could hit over the trees on 7 and hit it past the oak tree on 12 but was always polite and never hit into us!  The course is as good as it gets as there are some long holes and some short but tricky ones (4 is the only exception and it used to be a narrow par 4), some uphill (always into the wind), some downhill, wicked 3 tiered greens, two evil oak trees on 12 (yes the second one that replaced the old tree that got hit by lightning grew) and the best view on the last hole.  Alumni rates are a bit steep but I would play here anytime!"
        }),
        knex('comments').insert({
            course_id: 3,
            commenter_id:2,
            rating:5,
            comment:'Does golf get any better than this? If you ever have the chance to play this course, I suggest you move heaven and earth to do so. Truly magnificent.'

        }),
        knex('comments').insert({
            course_id: 1,
            commenter_id:3,
            rating:4,
            comment:"Green Hills is a first class Alister MacKenzie golf course, with a beautiful new clubhouse. You have to play this golf course!"
        }),
        knex('comments').insert({
            course_id: 2,
            commenter_id:3,
            rating:4,
            comment:"A fun yet challenging test of golf at an excellent facility.  A very natural layout and design leaves the golfer no room to complain.  There is room to miss your shots here and there, but if you are consistently off line, you will end up paying the price.  Some outstanding views to be had on the back 9 as well."
        }),
        knex('comments').insert({
            course_id: 3,
            commenter_id:3,
            rating:5,
            comment:"The 5 star should go without saying. If you ever have a chance to play this course then take it. When we teed off there were 4 cars in the parking lot and I'm assuming 2 were the guys working in the pro shop. The course views are what golf is all about and every blade of grass is perfectly manicured. I feel very fortunate to be able to cross this course off my list of courses to play. I've now played all of the courses in the Monterey Peninsula except for Pebble Beach (will get that one soon). Honestly in terms of layout, I like Spyglass more than I liked Cypress as a whole, but the finishing holes at Cypress are as good as it gets. Really the only complaint I had with the course is that it is extremely easy. As a better than scratch golfer I was able to tear it up first time seeing it. I had middle irons into the par 5's, the par 4 9th was drivable with a 3 wood, every other par 4 was a short iron or wedge second, and with the greens that pure you will make putts. Technology has definitely come a long way"
        })
      ]);
    });
};
