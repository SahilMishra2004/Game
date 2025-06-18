import sys
import os
from dotenv import load_dotenv

# Add your project directory to the Python path
project_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_dir)

# Load environment variables
load_dotenv(os.path.join(project_dir, '.env'))

# Import your Flask application
from app import app as application

# Optional: Configure production settings
application.config['ENV'] = 'production'
application.config['DEBUG'] = False
application.config['TESTING'] = False