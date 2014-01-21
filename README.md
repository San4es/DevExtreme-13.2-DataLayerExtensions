PhoneJS-DataLayerExtensions
===========================

The [PhoneJS] [1] data layer includes the Store data access interface, which is supported by all PhoneJS UI elements working with data, such as the dxList, dxGallery, dxTileView widgets, etc. PhoneJS includes several Store implementations out-of-the-box.
* [ArrayStore] [2] - provides access to an in-memory array
* [LocalStore] [3] provides access to the HTML5 web storage
* [ODataStore] [4] provides access to a remote OData service
* [CustomStore] [5] a Store that enables you to implement your own data access logic.

In addition to these stores, we have introduced the [BreezeJS] [6] and [JayData] [7] extensions, which contain classes accessing data via the BreezeJS and JayData libraries respectively. These classes also implement the Store interface, which provides their compatibility with PhoneJS widgets and enables you to use standard PhoneJS facilities to read and write data.


[1]: http://phonejs.devexpress.com/ "PhoneJS"
[2]: http://phonejs.devexpress.com/Documentation/ApiReference/Data/ArrayStore "ArrayStore"
[3]: http://phonejs.devexpress.com/Documentation/ApiReference/Data/LocalStore "LocalStore"
[4]: http://phonejs.devexpress.com/Documentation/ApiReference/Data/ODataStore "ODataStore"
[5]: http://phonejs.devexpress.com/Documentation/ApiReference/Data/CustomStore "CustomStore"
[6]: http://www.breezejs.com/ "Breeze"
[7]: http://jaydata.org/ "JayData"
