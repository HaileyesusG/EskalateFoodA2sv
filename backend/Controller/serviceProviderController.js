const ServiceProvider = require("../Model/ServiceProvider");

// Function to assign a job to the nearest service provider based on location, accepted work, and registration
async function assignJob(req, res) {
  const { serviceDepartment } = req.query;
  const { lat, lon, customerName, customerPhoneNumber } = req.body;

  try {
    // Create 2dsphere index on the location.coordinates field
    await ServiceProvider.collection.createIndex({
      "location.coordinates": "2dsphere",
    });

    let nearestProvider = await ServiceProvider.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [lon, lat],
          },
          distanceField: "distance",
          spherical: true,
          query: {
            status: "available",
            serviceDepartment: serviceDepartment,
          },
          sort: {
            acceptedWork: 1,
            createdAt: 1,
          },
        },
      },
      {
        $project: {
          location: 0,
        },
      },
    ]);

    let providersChecked = [];
    while (
      !nearestProvider ||
      (nearestProvider.length > 0 &&
        providersChecked.includes(nearestProvider[0]._id))
    ) {
      if (nearestProvider && nearestProvider.length > 0) {
        providersChecked.push(nearestProvider[0]._id);
      }

      nearestProvider = await ServiceProvider.aggregate([
        // Aggregation pipeline stages...
      ]);
    }

    if (nearestProvider && nearestProvider.length > 0) {
      const selectedProvider = nearestProvider[0];
      console.log("Assigned job to:", selectedProvider.name);
      selectedProvider.status = "busy";
      selectedProvider.acceptedWork += 1;
      await selectedProvider.save();

      // Send notification to the selected service provider
      const notification = {
        customerName: customerName,
        customerPhoneNumber: customerPhoneNumber,
        customerLocation: { lat: lat, lon: lon },
      };
      console.log("Notification sent to:", selectedProvider.name);
      console.log("Notification:", notification);

      res.send("Job assigned to: " + selectedProvider.name);
    } else {
      console.log(
        "No available service providers for the specified service department"
      );
      res.send(
        "No available service providers for the specified service department"
      );
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

// Function to create a new service provider
async function CreateProvider(req, res) {
  const { name, serviceDepartment } = req.body;
  const { location } = req.body;
  const { lon, lat } = location;
  console.log(lon, lat);

  try {
    const serviceProvider = new ServiceProvider({
      name,
      serviceDepartment,
      location: {
        type: "Point",
        coordinates: [lon, lat],
      },
    });

    await serviceProvider.save();
    res.status(201).json(serviceProvider);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { assignJob, CreateProvider };
