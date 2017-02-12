'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('courses').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('courses').insert({
            //id: 1,
            name: 'Green Hills Country Club',
            description:'The Course at Green Hills was designed by famed architect Dr. Alister MacKenzie, who designed over 100 golf courses - three of such high caliber they are ranked in the world’s top 20 - Cypress Point (Pebble Beach CA), Royal Melbourne (Melbourne, Australia), and Augusta National (Augusta GA), site of the Masters.',
            image:'https://scontent.fsnc1-5.fna.fbcdn.net/v/t31.0-8/964572_10201311868388490_1634203818_o.jpg?oh=5728268d9ba5c51fa4b14be1447eb23a&oe=5900570E',
            address:'500 Ludeman Lane',
            city:'Millbrae',
            country:'United States',
            state:'California',
            zip:94030
        }),
        knex('courses').insert({
            //id: 2,
            name: 'Stanford',
            description:"Stanford Golf Course was designed in 1930 by renowned golf course architects William Bell and George C. Thomas. Located in the foothills above the Stanford University Campus, the golf course is consistently rated one of the finest courses in the world. In 2009 Stanford was rated the nation's 3rd best college course by golf coaches.",
            image:'https://golfcourse.stanford.edu/images_Dost/Dost12a1000.jpg',
            address:'91 Links Rd.',
            city:'Stanford',
            country:'United States',
            state:'California',
            zip:94304
        }),
        knex('courses').insert({
            //id: 3,
            name: 'Cypress Point',
            description:"Amongst the world of golf, few courses are as revered as Cypress Point. Cypress Point Golf Course was created by the well renown designer Alister Mackenzie and opened in 1928. Extraordinary and timeless, Alister Mackenzie masterpiece is consistently rated as one of the top 3 golf courses ever created by all major publications. Cypress Point offers natural beauty that is unmatched anywhere. The clandestine approach to Mackenzie's achievement is the reality that he did not over power the natural terrain, allowing the course to take shape organically.",
            image:'http://www.montereypeninsulagolf.com/images/course/cypress_point/cypress_point_golf_club_peninsula.jpg',
            address:'3150 17 Mile Dr',
            city:'Pebble Beach',
            country:'United States',
            state:'California',
            zip:93953
        }),
        knex('courses').insert({
            //id: 3,
            name: 'Olympic Club Ocean',
            description:"The Ocean Course has seen many changes over its history including a recent complete redesign and reconstruction in 2012 by architects Bill Love and Brian Kington. The Ocean Course's storied past includes winter El Niño storms in 1983, and 1997 that caused significant damage and required major changes to the course and layout. During the mid-1990s, the club built 4 holes west of Skyline Blvd. along the bluffs overlooking the Pacific Ocean. Holes of par 4, par 3, par 5, and par 4 had dramatic views, but these holes were severely eroded and fell victim to the 1997 storm. Prior to the recent 2012 renovation project the course had been rebuilt in 1999.",
            image:'http://dddi6o7noc2x9.cloudfront.net/wp-content/uploads/2014/08/OC-846x457.jpg',
            address:'599 Skyline Blvd',
            city:'San Francisco',
            country:'United States',
            state:'California',
            zip:94132
        }),
        knex('courses').insert({
            //id: 3,
            name: 'Olympic Club Lake Course',
            description:"The Lake Course has been recognized by Golf Magazine in its list of the Top 100 Courses in the U.S. It has also been recognized in Golf Week's category of America's 100 Best Classical Courses. In Golf Digest's list of the U.S. 100 Greatest Courses for 2007–2008, the Lake Course was ranked 23.The yardage of the Lake Course is 7,060 yards from the new championship tees, with a course rating of 75.7 and a slope rating of 143. From the next set of tees forward, the course measures 6,529 yards, and has a course rating of 72.3 and a slope rating of 132. From the next set of tees forward, the course measures 6,235 yards, and has a course rating of 70.9 and a slope rating of 129. From the front tees, the course measures 5,593 yards, and has a course rating of 68.6 and a slope rating of 122.",
            image:'https://upload.wikimedia.org/wikipedia/commons/e/ee/Olympic_Club_18th_hole_lakeside.jpg',
            address:'599 Skyline Blvd',
            city:'San Francisco',
            country:'United States',
            state:'California',
            zip:94132
        }),
        knex('courses').insert({
            //id: 3,
            name: 'San Francisco Golf Club',
            description:"San Francisco Golf Club is an athletic club and private social club in San Francisco, California. It is one of the most exclusive private membership clubs in San Francisco. In Golfdigest's 2015-2016 ranking of America's best golf courses, San Francisco Golf Club secured the 35th best course.",
            image:'https://s3-media3.fl.yelpcdn.com/bphoto/nM4r64ID5Eq0vOhtFDQXyg/o.jpg',
            address:'1310 Junipero Serra Blvd',
            city:'San Francisco',
            country:'United States',
            state:'California',
            zip:94132
        }),
        knex('courses').insert({
            //id: 3,
            name: 'Lake Merced Golf Club',
            description:"This 18 hole golf club is a hidden jewel for golf purists and a wonderful example of what makes the great City of San Francisco so special. In 1922 a group of local visionaries purchased a 140 acre plot of land just a few miles south of the Financial District of San Francisco and made it into what is now-a renowned historic landmark signified by the greatness of bold endeavor and achievement.",
            image:'http://www.lmgc.org/images/dynamic/getImage.gif?ID=100328',
            address:'2300 Junipero Serra Blvd',
            city:'Daly City',
            country:'United States',
            state:'California',
            zip:94015
        }),
        knex('courses').insert({
            //id: 3,
            name: 'Burlingame Country Club',
            description:"The 18-hole Burlingame Country Club in Hillsborough, CA is a private golf course that opened in 1893. Designed by Robert Trent Jones, Sr., Burlingame Country Club measures 6289 yards from the longest tees and has a slope rating of 129 and a 71.5 USGA rating. The course features 4 sets of tees for different skill levels. The greens are rye grass.",
            image:'http://www.burlingameccwnc.com/documents/10180/0/fall12.jpg',
            address:'80 New Place Rd',
            city:'Hillsborough',
            country:'United States',
            state:'California',
            zip:94010
        }),
        knex('courses').insert({
            //id: 3,
            name: 'California Golf Club',
            description:"The California Golf Club of San Francisco  was founded in 1918 and was originally located in Ingleside, southwest of San Francisco on land leased from the Spring Valley Water Company. Unable to obtain a long term lease from the water company, the club purchased approximately 425 acres down the Peninsula in 1924.  The land was part of the original Baden Farm and its rolling hills, timbered land and views of the bay created an ideal setting for a world class golf course. ",
            image:'https://static1.squarespace.com/static/557c64bae4b0fd931dc0fdf3/t/557c6c23e4b0c0319fa78c6e/1434217517285/Clubhouse+-+%232.jpg?format=2500w',
            address:'844 W Orange Ave',
            city:'South San Francisco',
            country:'United States',
            state:'California',
            zip:94080
        })
      ]);
    });
};
