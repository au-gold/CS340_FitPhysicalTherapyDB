import json
import json
from datetime import timedelta, date

class CustomJSONEncoder(json.JSONEncoder):
    """
    Custom JSON Encoder to handle timedelta and date objects.
    Extends the default JSONEncoder to add support for additional types.
    """
    
    def default(self, obj):
        """
        Override the default method to handle specific types.
        Args:
            obj: The object to serialize. 
        Returns:
            Serialized version of the object if it's a known type,
            otherwise passes the object to the superclass method.
        """
        if isinstance(obj, timedelta):
            return str(obj)  # Convert timedelta to string format
        if isinstance(obj, date):
            return obj.isoformat()  # Convert date to ISO format string
        return super().default(obj)  # Call the default method for other types

def jsonify_with_encoder(data):
    """
    Convert a Python object to a JSON string using the CustomJSONEncoder.
    Args:
        data: The data to serialize.
    Returns:
        A JSON string representation of the data.
    """
    return json.dumps(data, cls=CustomJSONEncoder)
